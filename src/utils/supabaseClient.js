import { createClient } from '@supabase/supabase-js';
//예승님 api
// const supabaseUrl = 'https://oplfrrqzxaiyfszulsjm.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wbGZycnF6eGFpeWZzenVsc2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNDkyNzMsImV4cCI6MjA2ODcyNTI3M30.xjNFHBpat6O15RMJrCKhjE9jwlcT7M3miDUmhacYOr8';

//준형님 api
// 7월 31일: B1/B2/B3층 1~20번 slot은 "일반예약"이 된 상태
// 8월 15일~9월 15일: B1/B2/B3 1번 slot은 "정기권 예약"
// 11월 1일 ~31일: B1/B2/B3층 1~20번 slot은 "정기권 예약"이 된 상태
// 26년 01월~1달 B1/B2/B3층 1~30번 slot은 "정기권 예약"이 된 상태
const supabaseUrl = 'https://tvutfwigajqwyowmutab.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2dXRmd2lnYWpxd3lvd211dGFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2ODc3OTMsImV4cCI6MjA2OTI2Mzc5M30.iNrdg0OokYTsNu8dTChlOvdLz8dUv3c6iTrRra97-ME';
export const supabase = createClient(supabaseUrl, supabaseKey);
