import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oplfrrqzxaiyfszulsjm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wbGZycnF6eGFpeWZzenVsc2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNDkyNzMsImV4cCI6MjA2ODcyNTI3M30.xjNFHBpat6O15RMJrCKhjE9jwlcT7M3miDUmhacYOr8';

export const supabase = createClient(supabaseUrl, supabaseKey);
