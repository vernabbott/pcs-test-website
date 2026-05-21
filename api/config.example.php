<?php

declare(strict_types=1);

return [
    'smtp' => [
        'host' => 'smtp.gmail.com',
        'port' => 587,
        'secure' => 'tls',
        'username' => 'vern@procoatingsystems.com',
        'password' => 'REPLACE_WITH_GOOGLE_APP_PASSWORD',
        'from_email' => 'vern@procoatingsystems.com',
        'from_name' => 'Professional Coating Systems Website',
    ],
    'recipients' => [
        'estimate' => 'vern@procoatingsystems.com',
        'contact' => 'contact@procoatingsystems.com',
    ],
    'allowed_origins' => [
        'https://procoatingsystems.com',
        'https://www.procoatingsystems.com',
    ],
];
