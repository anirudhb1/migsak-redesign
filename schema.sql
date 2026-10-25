

CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name VARCHAR(80) NOT NULL,
  email VARCHAR(254) NOT NULL,
  country VARCHAR(10) NOT NULL DEFAULT 'IN',
  phone VARCHAR(50),
  service VARCHAR(100) NOT NULL,
  budget VARCHAR(100) NOT NULL DEFAULT 'Not sure yet',
  message TEXT NOT NULL,
  
  CONSTRAINT check_name_length CHECK (char_length(name) >= 2 AND char_length(name) <= 80),
  CONSTRAINT check_email_length CHECK (char_length(email) <= 254),
  CONSTRAINT check_message_length CHECK (char_length(message) >= 10 AND char_length(message) <= 8000),
  CONSTRAINT check_service_valid CHECK (
    service IN ('Website or web app', 'Mobile app', 'Automation or integration', 'Not sure yet')
  )
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS country VARCHAR(10) NOT NULL DEFAULT 'IN';

ALTER TABLE enquiries ALTER COLUMN budget SET DEFAULT 'Not sure yet';

ALTER TABLE enquiries DROP CONSTRAINT IF EXISTS check_name_length;
ALTER TABLE enquiries ADD CONSTRAINT check_name_length CHECK (char_length(name) >= 2 AND char_length(name) <= 80);

ALTER TABLE enquiries DROP CONSTRAINT IF EXISTS check_email_length;
ALTER TABLE enquiries ADD CONSTRAINT check_email_length CHECK (char_length(email) <= 254);

ALTER TABLE enquiries DROP CONSTRAINT IF EXISTS check_message_length;
ALTER TABLE enquiries ADD CONSTRAINT check_message_length CHECK (char_length(message) >= 10 AND char_length(message) <= 8000);

ALTER TABLE enquiries DROP CONSTRAINT IF EXISTS check_service_valid;
ALTER TABLE enquiries ADD CONSTRAINT check_service_valid CHECK (
  service IN ('Website or web app', 'Mobile app', 'Automation or integration', 'Not sure yet')
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
