import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://snvzdtwadbkdpfcxepig.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNudnpkdHdhZGJrZHBmY3hlcGlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNTM4NDksImV4cCI6MjA4OTYyOTg0OX0.dX-upnGRImxuuJ0F8xZ-KbXKSB_vhfPK2VJ4fKWKlIU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
