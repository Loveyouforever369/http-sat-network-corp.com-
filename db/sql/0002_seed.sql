-- ════════════════════════════════════════════════════════════════════════
--  Combinatorial seeder — fills the catalog cheaply (no LLM calls).
--  Usage:  select seed_agents(1000000);
--  Idempotent & incremental (anti-joins backfill only what's missing).
-- ════════════════════════════════════════════════════════════════════════

create or replace function seed_reference() returns void as $$
begin
  insert into app_users (id, email, display_name, is_system) values
    ('00000000-0000-0000-0000-000000000001','system@sat.network','SAT System', true)
  on conflict (id) do nothing;

  insert into categories (slug, name, sort_order) values
    ('ecommerce-customer-retention','E-Commerce Customer Retention',1),
    ('revenue-operations','Revenue Operations & Support',2),
    ('sales-enablement','Sales Enablement',3),
    ('finance-automation','Finance & Billing Automation',4),
    ('it-devops','IT & DevOps',5),
    ('marketing-growth','Marketing & Growth',6),
    ('hr-people-ops','HR & People Ops',7),
    ('data-analytics','Data & Analytics',8),
    ('customer-success','Customer Success',9),
    ('security-compliance','Security & Compliance',10)
  on conflict (slug) do nothing;

  insert into tags (slug, name) values
    ('webhook','Webhook'),('refund','Refund'),('churn','Churn'),('sms','SMS'),
    ('crm','CRM'),('billing','Billing'),('alerting','Alerting'),('triage','Triage'),
    ('sentiment','Sentiment'),('automation','Automation')
  on conflict (slug) do nothing;

  insert into souls (id, name, content, config, guardrails) values
    ('00000000-0000-0000-0000-0000000000a1','Base SOUL','(base DNA)',
     '{"role":"automation agent"}'::jsonb,
     '{"execution_mode":"dry_run","require_grounding":true}'::jsonb)
  on conflict (id) do nothing;
end $$ language plpgsql;

create or replace function seed_agents(n int) returns int as $$
declare
  providers text[] := array['Shopify','Stripe','Slack','Salesforce','Zendesk','Linear',
    'Twilio','DocuSign','HubSpot','Notion','Jira','Intercom','QuickBooks','Mailchimp',
    'Asana','GitHub','PagerDuty','Segment','Snowflake','Airtable'];
  workflows text[] := array['Auto-Refunder','Churn-Crusher','SMS Chaser','Lead Router',
    'Invoice Reconciler','Ticket Triage','Onboarding Nudger','Fraud Flagger',
    'Renewal Reminder','Upsell Spotter','Sentiment Watcher','Escalation Bot',
    'Dunning Manager','Survey Pulse','Deal Desk','Stock Alerter','Compliance Auditor',
    'Meeting Scribe','Pipeline Hygienist','Payout Sentinel'];
  trig text[] := array['ticket.created','customer.subscription.deleted','envelope-sent',
    'order.created','invoice.payment_failed','deal.updated','message.posted',
    'issue.created','charge.refunded','form.submitted'];
  themes text[] := array['neon shopping cart','shattered credit card','glowing smartphone',
    'holographic data drop','chrome circuitry','warning beacon','digital scroll',
    'cyber-finance','neon text message','glowing red pulse'];
  cat_ids uuid[];
  owner uuid := '00000000-0000-0000-0000-000000000001';
  base_g bigint;
begin
  perform seed_reference();
  select array_agg(id order by sort_order) into cat_ids from categories;
  select coalesce(max(substring(public_id from 5)::bigint),0) into base_g
    from agents where public_id ~ '^AGT-\d+$';

  -- Agents
  insert into agents (public_id, slug, name, tagline, description, category_id,
                      status, visibility, owner_id, popularity, install_count)
  select
    'AGT-' || lpad((base_g+g)::text,7,'0'),
    'agent-' || (base_g+g),
    providers[1+((base_g+g) % cardinality(providers))] || ' ' ||
      workflows[1+(((base_g+g)/3) % cardinality(workflows))],
    'Automates ' || lower(workflows[1+(((base_g+g)/3) % cardinality(workflows))]) ||
      ' across ' || providers[1+((base_g+g) % cardinality(providers))],
    'Agent ' || (base_g+g) || ' watches ' || providers[1+((base_g+g) % cardinality(providers))] ||
      ' for ' || trig[1+((base_g+g) % cardinality(trig))] || ' events and runs a ' ||
      lower(workflows[1+(((base_g+g)/3) % cardinality(workflows))]) || ' workflow across ' ||
      providers[1+(((base_g+g)/5) % cardinality(providers))] || ' and ' ||
      providers[1+(((base_g+g)/7) % cardinality(providers))] || '.',
    cat_ids[1+((base_g+g) % cardinality(cat_ids))],
    'active','public', owner,
    round((random()*100)::numeric,2),
    (random()*5000)::int
  from generate_series(1,n) g
  on conflict (public_id) do nothing;

  -- Marketing (1:1) — anti-join backfill
  insert into agent_marketing (agent_id, short_pitch, visual_theme_keywords, crreo_prompt, veo_prompt)
  select a.id,
    'Agent ' || gg || ' automates "' || a.name || '" so your team stops doing it by hand.',
    themes[1+(gg % cardinality(themes))],
    'A futuristic 3D isometric ' || themes[1+(gg % cardinality(themes))] ||
      ', octane render, isometric perspective, high contrast neon cyan and magenta lighting, ' ||
      'chrome textures, dark gritty atmospheric background, highly detailed digital circuitry.',
    '[Camera]: Slow dolly-in on a 16mm lens. [Subject]: ' || a.name ||
      ' rendered as glowing chrome machinery. [Action]: a frantic red alert shatters into ' ||
      'glass shards and reforms into a calm blue checkmark. [Style]: cinematic cyberpunk, ' ||
      'fine digital noise, realistic physics. [Audio]: urgent alarm into a satisfying digital chime.'
  from agents a
  cross join lateral (select (substring(a.public_id from 5))::bigint as gg) x
  left join agent_marketing m on m.agent_id = a.id
  where m.agent_id is null and a.public_id ~ '^AGT-\d+$';

  -- One trigger each — anti-join backfill
  insert into agent_triggers (agent_id, platform, webhook_type, conditions)
  select a.id,
    providers[1+(gg % cardinality(providers))],
    trig[1+(gg % cardinality(trig))],
    jsonb_build_array('event.type == ''' || trig[1+(gg % cardinality(trig))] || '''')
  from agents a
  cross join lateral (select (substring(a.public_id from 5))::bigint as gg) x
  left join agent_triggers t on t.agent_id = a.id
  where t.agent_id is null and a.public_id ~ '^AGT-\d+$';

  -- Three steps each — anti-join backfill
  insert into agent_steps (agent_id, step_index, name, condition, provider, endpoint, method, action)
  select a.id, s.step_index,
    'step_' || s.step_index || '_' ||
      lower(replace(workflows[1+((gg/3) % cardinality(workflows))],' ','_')),
    case when s.step_index = 1 then null else 'step_' || (s.step_index-1) || '.ok == true' end,
    providers[1+((gg + s.step_index*4) % cardinality(providers))],
    '/api/v2/' || lower(replace(workflows[1+((gg/3) % cardinality(workflows))],' ','-')),
    (array['GET','POST','PUT','GRAPHQL']::http_method[])[1+(s.step_index % 4)],
    'Step ' || s.step_index || ' of the ' ||
      workflows[1+((gg/3) % cardinality(workflows))] || ' workflow.'
  from agents a
  cross join lateral (select (substring(a.public_id from 5))::bigint as gg) x
  cross join generate_series(1,3) s(step_index)
  left join agent_steps e on e.agent_id = a.id and e.step_index = s.step_index
  where e.agent_id is null and a.public_id ~ '^AGT-\d+$';

  perform refresh_category_facets();
  return n;
end $$ language plpgsql;
