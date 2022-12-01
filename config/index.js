const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.PROJECT_URL || '';
const supabaseServiceRoleKey = process.env.PROJECT_SERVICE_ROLE_KEY || '';

const SUPABASE_CONFIG = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
};

const supabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey, SUPABASE_CONFIG);

module.exports = { supabaseClient };
