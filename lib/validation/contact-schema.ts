// lib/validation/contact-schema.ts
// Contact form validation schema (Zod)

import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le nom contient des caractères invalides'),

  email: z
    .string()
    .min(1, 'L\'email est requis')
    .email('Veuillez entrer un email valide')
    .max(100, 'L\'email ne peut pas dépasser 100 caractères'),

  company: z
    .string()
    .min(2, 'Le nom de l\'entreprise doit contenir au moins 2 caractères')
    .max(100, 'Le nom de l\'entreprise ne peut pas dépasser 100 caractères')
    .optional()
    .or(z.literal('')),

  phone: z
    .string()
    .regex(
      /^(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
      'Veuillez entrer un numéro de téléphone valide (format: 514-123-4567)'
    )
    .optional()
    .or(z.literal('')),

  subject: z
    .string()
    .min(5, 'Le sujet doit contenir au moins 5 caractères')
    .max(150, 'Le sujet ne peut pas dépasser 150 caractères'),

  message: z
    .string()
    .min(20, 'Le message doit contenir au moins 20 caractères')
    .max(2000, 'Le message ne peut pas dépasser 2000 caractères'),

  requestType: z.enum(['question', 'demo', 'support', 'partnership', 'other']),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const requestTypeLabels: Record<ContactFormData['requestType'], string> = {
  question: 'Question générale',
  demo: 'Demande de démo',
  support: 'Support technique',
  partnership: 'Partenariat',
  other: 'Autre',
};
