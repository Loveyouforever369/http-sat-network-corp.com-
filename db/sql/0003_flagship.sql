-- ════════════════════════════════════════════════════════════════════════
--  Flagship agents — the 3 real records from the spec, exactly modeled.
--  Seeded as dry_run for safety (auto-refunder cannot move money until live).
--  Idempotent: agents on-conflict-skip; dependents guarded by NOT EXISTS.
-- ════════════════════════════════════════════════════════════════════════
select seed_reference();

-- ── AGT-45902 — Angry Customer Auto-Refunder ────────────────────────────
insert into agents (public_id, slug, name, tagline, description, category_id,
                    status, visibility, owner_id, model, execution_mode, popularity, install_count)
values ('AGT-45902','angry-customer-auto-refunder','Angry Customer Auto-Refunder',
  'Detects angry refund tickets and auto-processes small Shopify refunds',
  'Watches Zendesk for refund/return tickets, scores sentiment, fetches the Shopify order, and auto-refunds orders under $20 — then resolves the ticket.',
  (select id from categories where slug='ecommerce-customer-retention'),
  'active','public','00000000-0000-0000-0000-000000000001','claude-opus-4-8','dry_run',98.40,4821)
on conflict (public_id) do nothing;

insert into agent_triggers (agent_id, platform, webhook_type, conditions)
select (select id from agents where public_id='AGT-45902'),'Zendesk','ticket.created',
  jsonb_build_array('ticket.subject CONTAINS ''refund'' OR ticket.subject CONTAINS ''return''','ticket.channel == ''email''')
where not exists (select 1 from agent_triggers t where t.agent_id=(select id from agents where public_id='AGT-45902'));

insert into agent_steps (agent_id, step_index, name, condition, provider, endpoint, method, action, payload)
select a.id, v.step_index, v.name, v.condition, v.provider, v.endpoint, v.method::http_method, v.action, v.payload
from (select id from agents where public_id='AGT-45902') a
cross join (values
  (1,'step_1_analyze_sentiment', null, 'OpenAI','POST /v1/chat/completions','POST',
     'Analyze the Zendesk ticket body. Return JSON with sentiment_score and is_angry boolean.',
     '{"model":"gpt-4o-mini","response_format":"json_object"}'::jsonb),
  (2,'step_2_fetch_order','step_1.is_angry == true','Shopify','GraphQL Admin API','GRAPHQL',
     'Query order by customer email from the Zendesk ticket; retrieve order_id and total_price.', null),
  (3,'step_3_execute_refund','step_2.total_price < 20.00','Shopify',
     'POST /admin/api/2023-10/orders/{order_id}/refunds.json','POST',
     'Execute full refund.', '{"reason":"automated_retention_refund"}'::jsonb),
  (4,'step_4_update_ticket', null,'Zendesk','PUT /api/v2/tickets/{ticket_id}.json','PUT',
     'Set ticket status to solved and append an internal note with the Shopify refund ID.', null)
) v(step_index,name,condition,provider,endpoint,method,action,payload)
on conflict (agent_id, step_index) do nothing;

insert into agent_marketing (agent_id, short_pitch, visual_theme_keywords, crreo_prompt, veo_prompt)
select (select id from agents where public_id='AGT-45902'),
  'Agent 45,902 detects angry customer sentiment in Zendesk and instantly processes Shopify refunds under twenty dollars, saving your team hours of manual dispute resolution.',
  'neon shopping cart, glowing red pulse, chrome circuitry, cyberpunk',
  'A futuristic metallic shopping cart exploding with glowing red data fragments that reform into calm blue digital coins, hovering dynamically, in the style of 3D cyberpunk concept art, octane render, isometric perspective, high contrast neon cyan and magenta lighting, chrome textures, dark gritty atmospheric background, highly detailed digital circuitry.',
  '[Camera]: Slow dolly-in on a 16mm lens. [Subject]: A glowing, frantic red alert icon on a floating chrome shopping cart. [Action]: A sleek, chrome cybernetic hand enters the frame and taps the cart. The red alert shatters into geometric glass shards and is instantly replaced by a smooth, glowing blue checkmark. [Setting]: A dark, high-tech server room with deep shadows and atmospheric fog. [Light]: Harsh red flashing transitions to soft ambient cyan. [Style]: Cinematic, fine digital noise, realistic physics. [Audio]: Urgent digital alarm transitioning to a crisp, satisfying digital chime and calming ambient hum.'
where not exists (select 1 from agent_marketing m where m.agent_id=(select id from agents where public_id='AGT-45902'));

-- ── AGT-45903 — VIP Churn-Crusher Triage ────────────────────────────────
insert into agents (public_id, slug, name, tagline, description, category_id,
                    status, visibility, owner_id, model, execution_mode, popularity, install_count)
values ('AGT-45903','vip-churn-crusher-triage','VIP Churn-Crusher Triage',
  'Triages high-MRR Stripe cancellations into Linear tickets + Slack alerts',
  'Cross-references canceled Stripe subscriptions; if lost MRR exceeds $500 it opens an Urgent Linear issue and pings Slack leadership for an immediate churn autopsy.',
  (select id from categories where slug='revenue-operations'),
  'active','public','00000000-0000-0000-0000-000000000001','claude-opus-4-8','dry_run',96.10,3380)
on conflict (public_id) do nothing;

insert into agent_triggers (agent_id, platform, webhook_type, conditions)
select (select id from agents where public_id='AGT-45903'),'Stripe','customer.subscription.deleted',
  jsonb_build_array('subscription.status == ''canceled''')
where not exists (select 1 from agent_triggers t where t.agent_id=(select id from agents where public_id='AGT-45903'));

insert into agent_steps (agent_id, step_index, name, condition, provider, endpoint, method, action, payload)
select a.id, v.step_index, v.name, v.condition, v.provider, v.endpoint, v.method::http_method, v.action, null::jsonb
from (select id from agents where public_id='AGT-45903') a
cross join (values
  (1,'step_1_evaluate_mrr', null,'Stripe','GET /v1/customers/{customer_id}','GET',
     'Retrieve customer metadata and historical MRR.'),
  (2,'step_2_create_engineering_ticket','step_1.mrr > 500.00','Linear','POST /graphql','GRAPHQL',
     'Create an Urgent issue in the Churn Analysis team board; attach Stripe customer ID and timestamp.'),
  (3,'step_3_alert_leadership','step_1.mrr > 500.00','Slack','POST /api/chat.postMessage','POST',
     'Ping #exec-alerts: @here High-value churn detected: Customer {customer_id} canceled. Linear ticket created.')
) v(step_index,name,condition,provider,endpoint,method,action)
on conflict (agent_id, step_index) do nothing;

insert into agent_marketing (agent_id, short_pitch, visual_theme_keywords, crreo_prompt, veo_prompt)
select (select id from agents where public_id='AGT-45903'),
  'Automatically cross-references canceled Stripe subscriptions, instantly creating high-priority Linear tickets and pinging Slack leadership if the lost MRR exceeds 500 dollars.',
  'shattered credit card, warning beacon, holographic data drop, cyber-finance',
  'A shattered neon credit card floating above a holographic warning terminal with cascading warning text, in the style of 3D cyberpunk concept art, octane render, isometric perspective, high contrast neon cyan and magenta lighting, chrome textures, dark gritty atmospheric background, highly detailed digital circuitry.',
  '[Camera]: Slow pan right on a 50mm lens. [Subject]: A glowing red holographic credit card hovering above a chrome pedestal. [Action]: The card violently shatters into hundreds of data fragments, triggering a glowing yellow Slack notification hologram to burst upward. [Setting]: A dark, rain-slicked server alleyway. [Light]: Strobing red emergency lights reflecting off wet surfaces. [Style]: Cinematic, fine digital noise, realistic physics. [Audio]: Glass shattering, heavy bass drop, sharp digital alert siren.'
where not exists (select 1 from agent_marketing m where m.agent_id=(select id from agents where public_id='AGT-45903'));

-- ── AGT-45904 — Contract Signature SMS Chaser ───────────────────────────
insert into agents (public_id, slug, name, tagline, description, category_id,
                    status, visibility, owner_id, model, execution_mode, popularity, install_count)
values ('AGT-45904','contract-signature-sms-chaser','Contract Signature SMS Chaser',
  'Texts leads via Twilio when DocuSign contracts go unsigned for 48h',
  'Watches DocuSign for delivered-but-unsigned envelopes, pulls the mobile number from Salesforce, sends a Twilio SMS nudge, and logs the activity back to the Lead.',
  (select id from categories where slug='sales-enablement'),
  'active','public','00000000-0000-0000-0000-000000000001','claude-opus-4-8','dry_run',94.75,2914)
on conflict (public_id) do nothing;

insert into agent_triggers (agent_id, platform, webhook_type, conditions)
select (select id from agents where public_id='AGT-45904'),'DocuSign','envelope-sent',
  jsonb_build_array('time_elapsed_since_sent >= 48_hours','envelope.status == ''delivered''')
where not exists (select 1 from agent_triggers t where t.agent_id=(select id from agents where public_id='AGT-45904'));

insert into agent_steps (agent_id, step_index, name, condition, provider, endpoint, method, action, payload)
select a.id, v.step_index, v.name, v.condition, v.provider, v.endpoint, v.method::http_method, v.action, null::jsonb
from (select id from agents where public_id='AGT-45904') a
cross join (values
  (1,'step_1_fetch_lead_data', null,'Salesforce',
     'GET /services/data/v58.0/query/?q=SELECT+Phone+FROM+Lead+WHERE+Email={signer_email}','GET',
     'Query Salesforce by the DocuSign signer email to extract the mobile phone number.'),
  (2,'step_2_dispatch_sms_nudge','step_1.phone IS NOT NULL','Twilio',
     'POST /2010-04-01/Accounts/{account_sid}/Messages.json','POST',
     'Send SMS: Hi {name}, a friendly reminder that your contract is ready for signature. Reply YES for a new link.'),
  (3,'step_3_log_activity', null,'Salesforce','POST /services/data/v58.0/sobjects/Task','POST',
     'Log a completed Task on the Lead indicating an automated SMS chase was executed via Twilio.')
) v(step_index,name,condition,provider,endpoint,method,action)
on conflict (agent_id, step_index) do nothing;

insert into agent_marketing (agent_id, short_pitch, visual_theme_keywords, crreo_prompt, veo_prompt)
select (select id from agents where public_id='AGT-45904'),
  'Never let a contract go cold. Agent 45,904 watches DocuSign, pulls mobile numbers from Salesforce, and automatically texts leads via Twilio if they have not signed in 48 hours.',
  'glowing smartphone, digital scroll, cyber-pen, neon text message',
  'A floating holographic digital contract wrapping elegantly around a glowing chrome smartphone, in the style of 3D cyberpunk concept art, octane render, isometric perspective, high contrast neon cyan and magenta lighting, chrome textures, dark gritty atmospheric background, highly detailed digital circuitry.',
  '[Camera]: Static wide shot on a 24mm lens. [Subject]: A sleek chrome robotic hand holding a glowing neon-cyan smartphone. [Action]: The phone vibrates heavily as a digital contract streams into the screen, shooting physical neon sparks upon completion. [Setting]: A high-rise corporate office overgrown with glowing server wires. [Light]: Neon magenta rim lighting cutting through dark fog. [Style]: Cinematic, sharp focus, octane render. [Audio]: Heavy phone haptic vibration, futuristic digital chime, low bass sweep.'
where not exists (select 1 from agent_marketing m where m.agent_id=(select id from agents where public_id='AGT-45904'));

select refresh_category_facets();
