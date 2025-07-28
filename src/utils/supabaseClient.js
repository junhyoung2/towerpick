import { createClient } from '@supabase/supabase-js';

//예승님꺼 api
// const supabaseUrl = 'https://oplfrrqzxaiyfszulsjm.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wbGZycnF6eGFpeWZzenVsc2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNDkyNzMsImV4cCI6MjA2ODcyNTI3M30.xjNFHBpat6O15RMJrCKhjE9jwlcT7M3miDUmhacYOr8';
 
//내꺼 api

//1. 8월 10일 만차 상태 
//2. 7월 31일 b1,b2,b3 1~20번 자리 만차
const supabaseUrl = 'https://fzvkphtiwikfedctvcmj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6dmtwaHRpd2lrZmVkY3R2Y21qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0MTIzODIsImV4cCI6MjA2ODk4ODM4Mn0.ipm2scubqgsktotnneFWP04mxiunTz9rNAbKsTmzgho';

export const supabase = createClient(supabaseUrl, supabaseKey);

