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

pcs_require_fields($data, ['emailAddress', 'streetAddress', 'city', 'state', 'zip', 'roofSize']);

$email = pcs_validate_email(pcs_clean_string($data['emailAddress'] ?? '', 255));
$streetAddress = pcs_clean_string($data['streetAddress'] ?? '', 255);
$city = pcs_clean_string($data['city'] ?? '', 120);
$state = pcs_clean_string($data['state'] ?? '', 120);
$zip = pcs_clean_string($data['zip'] ?? '', 30);
$roofSize = pcs_clean_string($data['roofSize'] ?? '', 60);
$roofType = pcs_clean_string($data['roofType'] ?? '', 120);
$source = pcs_clean_string($data['source'] ?? 'website-online-estimate', 120);

$recipient = (string) ($config['recipients']['estimate'] ?? '');
if ($recipient === '') {
    pcs_json_response(500, [
        'error' => 'Estimate recipient is not configured.',
    ]);
}

$subject = 'Website Estimate Request';
$htmlBody = sprintf(
    '<h2>Online Estimate Request</h2><p><strong>Source:</strong> %s</p><p><strong>Email:</strong> %s</p><p><strong>Street Address:</strong> %s</p><p><strong>City:</strong> %s</p><p><strong>State:</strong> %s</p><p><strong>ZIP:</strong> %s</p><p><strong>Estimated Roof Size:</strong> %s sqft</p><p><strong>Roof Type:</strong> %s</p>',
    pcs_escape($source),
    pcs_escape($email),
    pcs_escape($streetAddress),
    pcs_escape($city),
    pcs_escape($state),
    pcs_escape($zip),
    pcs_escape($roofSize),
    pcs_escape($roofType !== '' ? $roofType : 'Not provided')
);
$textBody = implode("\n", [
    'Online Estimate Request',
    "Source: {$source}",
    "Email: {$email}",
    "Street Address: {$streetAddress}",
    "City: {$city}",
    "State: {$state}",
    "ZIP: {$zip}",
    "Estimated Roof Size: {$roofSize} sqft",
    'Roof Type: ' . ($roofType !== '' ? $roofType : 'Not provided'),
]);

pcs_send_email($config, $recipient, $email, $email, $subject, $htmlBody, $textBody);

pcs_json_response(200, ['ok' => true]);
