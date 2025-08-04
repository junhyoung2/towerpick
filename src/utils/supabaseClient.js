import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://tvutfwigajqwyowmutab.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2dXRmd2lnYWpxd3lvd211dGFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2ODc3OTMsImV4cCI6MjA2OTI2Mzc5M30.iNrdg0OokYTsNu8dTChlOvdLz8dUv3c6iTrRra97-ME';
export const supabase = createClient(supabaseUrl, supabaseKey);
