<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

$config = pcs_config();
pcs_handle_preflight($config);
pcs_require_post();
pcs_send_cors_headers($config);

$data = pcs_request_data();
if (pcs_honeypot_triggered($data)) {
    pcs_json_response(200, ['ok' => true]);
}

pcs_require_fields($data, ['email', 'subject', 'message']);

$email = pcs_validate_email(pcs_clean_string($data['email'] ?? '', 255));
$subjectLine = pcs_clean_string($data['subject'] ?? '', 200);
$message = pcs_clean_string($data['message'] ?? '', 4000);
$source = pcs_clean_string($data['source'] ?? 'website-contact-form', 120);

$recipient = (string) ($config['recipients']['contact'] ?? '');
if ($recipient === '') {
    pcs_json_response(500, [
        'error' => 'Contact recipient is not configured.',
    ]);
}

$subject = 'Website Contact Request: ' . $subjectLine;
$htmlBody = sprintf(
    '<h2>Website Contact Request</h2><p><strong>Source:</strong> %s</p><p><strong>Email:</strong> %s</p><p><strong>Subject:</strong> %s</p><p><strong>Message:</strong></p><p>%s</p>',
    pcs_escape($source),
    pcs_escape($email),
    pcs_escape($subjectLine),
    nl2br(pcs_escape($message))
);
$textBody = implode("\n\n", [
    'Website Contact Request',
    "Source: {$source}",
    "Email: {$email}",
    "Subject: {$subjectLine}",
    "Message:\n{$message}",
]);

pcs_send_email($config, $recipient, $email, $email, $subject, $htmlBody, $textBody);

pcs_json_response(200, ['ok' => true]);
