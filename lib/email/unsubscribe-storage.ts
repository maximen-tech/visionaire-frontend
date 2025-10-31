// lib/email/unsubscribe-storage.ts
// Simple file-based unsubscribe list storage for MVP
// In production, migrate to database (PostgreSQL, Redis, etc.)

import { promises as fs } from 'fs';
import path from 'path';

const UNSUBSCRIBE_FILE = path.join(process.cwd(), 'data', 'unsubscribes.json');

export interface UnsubscribeRecord {
  email: string;
  analysisId: string;
  unsubscribedAt: string;
  reason?: string;
}

/**
 * Ensure data directory exists
 */
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

/**
 * Load unsubscribe list from file
 */
async function loadUnsubscribeList(): Promise<UnsubscribeRecord[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(UNSUBSCRIBE_FILE, 'utf-8');
    return JSON.parse(data) as UnsubscribeRecord[];
  } catch (error) {
    // File doesn't exist yet, return empty array
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    console.error('Error loading unsubscribe list:', error);
    return [];
  }
}

/**
 * Save unsubscribe list to file
 */
async function saveUnsubscribeList(list: UnsubscribeRecord[]): Promise<void> {
  try {
    await ensureDataDir();
    await fs.writeFile(UNSUBSCRIBE_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving unsubscribe list:', error);
    throw error;
  }
}

/**
 * Check if an email is unsubscribed
 *
 * @param email - Email address to check
 * @returns true if email is unsubscribed
 */
export async function isUnsubscribed(email: string): Promise<boolean> {
  const list = await loadUnsubscribeList();
  return list.some((record) => record.email.toLowerCase() === email.toLowerCase());
}

/**
 * Add email to unsubscribe list
 *
 * @param email - Email address to unsubscribe
 * @param analysisId - Analysis ID from token
 * @param reason - Optional unsubscribe reason
 * @returns true if successfully unsubscribed
 */
export async function addUnsubscribe(
  email: string,
  analysisId: string,
  reason?: string
): Promise<boolean> {
  try {
    const list = await loadUnsubscribeList();

    // Check if already unsubscribed
    if (list.some((record) => record.email.toLowerCase() === email.toLowerCase())) {
      return true; // Already unsubscribed, return success
    }

    // Add new unsubscribe record
    const record: UnsubscribeRecord = {
      email: email.toLowerCase(),
      analysisId,
      unsubscribedAt: new Date().toISOString(),
      reason,
    };

    list.push(record);
    await saveUnsubscribeList(list);

    console.log('Email unsubscribed:', { email, analysisId });
    return true;
  } catch (error) {
    console.error('Error adding unsubscribe:', error);
    return false;
  }
}

/**
 * Get all unsubscribe records (admin only)
 *
 * @returns Array of all unsubscribe records
 */
export async function getAllUnsubscribes(): Promise<UnsubscribeRecord[]> {
  return loadUnsubscribeList();
}

/**
 * Remove email from unsubscribe list (re-subscribe)
 * Use with caution - should only be done with explicit user consent
 *
 * @param email - Email address to re-subscribe
 * @returns true if successfully removed
 */
export async function removeUnsubscribe(email: string): Promise<boolean> {
  try {
    const list = await loadUnsubscribeList();
    const filteredList = list.filter(
      (record) => record.email.toLowerCase() !== email.toLowerCase()
    );

    if (filteredList.length === list.length) {
      return false; // Email was not in the list
    }

    await saveUnsubscribeList(filteredList);
    console.log('Email re-subscribed:', { email });
    return true;
  } catch (error) {
    console.error('Error removing unsubscribe:', error);
    return false;
  }
}
