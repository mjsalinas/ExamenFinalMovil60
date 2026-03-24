import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://snvzdtwadbkdpfcxepig.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNudnpkdHdhZGJrZHBmY3hlcGlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNTM4NDksImV4cCI6MjA4OTYyOTg0OX0.dX-upnGRImxuuJ0F8xZ-KbXKSB_vhfPK2VJ4fKWKlIU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);