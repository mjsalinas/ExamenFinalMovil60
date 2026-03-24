import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://snvzdtwadbkdpfcxepig.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_FwAmYRgqYDblgAQi696cTg_SQEsNFAK"

export const supabase = createClient(SUPABASE_URL,SUPABASE_ANON_KEY);
