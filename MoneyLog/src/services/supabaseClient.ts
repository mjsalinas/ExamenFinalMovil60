import { createClient } from '@supabase/supabase-js'
import * as SecureStore from 'expo-secure-store'

const supabaseUrl = 'https://snvzdtwadbkdpfcxepig.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNudnpkdHdhZGJrZHBmY3hlcGlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNTM4NDksImV4cCI6MjA4OTYyOTg0OX0.dX-upnGRImxuuJ0F8xZ-KbXKSB_vhfPK2VJ4fKWKlIU'   // ← pega aquí tu anon key correcta

const ExpoSecureStoreAdapter = {
    getItem:    (key: string) => SecureStore.getItemAsync(key),
    setItem:    (key: string, value: string) => SecureStore.setItemAsync(key, value),
    removeItem: (key: string) => SecureStore.deleteItemAsync(key),
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage:           ExpoSecureStoreAdapter,
        autoRefreshToken:  true,
        persistSession:    true,
        detectSessionInUrl: false,
    },
})