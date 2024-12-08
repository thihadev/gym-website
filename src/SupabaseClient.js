import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tvrbbdebyucsfvohafyf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2cmJiZGVieXVjc2Z2b2hhZnlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwNDEyMDAsImV4cCI6MjA0ODYxNzIwMH0.XBU4xftxhZbO8c4H1oMGLeZq_AQ7q8u_dVpolSl9gQw'
export const supabase = createClient(supabaseUrl, supabaseKey);
