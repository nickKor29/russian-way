import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ceuifpocmqziworgbkqh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNldWlmcG9jbXF6aXdvcmdia3FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5NDI4MDIsImV4cCI6MjAzODUxODgwMn0.z_mxxRQfaQSwk0A-XsdKNXgHxmpLa4HVOrNwoNXi9Bg";
const serviceRole =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNldWlmcG9jbXF6aXdvcmdia3FoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMjk0MjgwMiwiZXhwIjoyMDM4NTE4ODAyfQ.ZurrInVsuWHNGCGjCvgfOnHE20JzDFbuxM_pXiV6Dg8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
export const supabase2 = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storageKey: "supabase_auth_storage_key_2",
  },
});
export const supabaseAdmin = createClient(supabaseUrl, serviceRole, {
  auth: {
    persistSession: false,
  },
});
