<?php

class Jwt
{
    public static function encode(array $payload, string $secret, int $ttlSeconds = 3600): string
    {
        $header = ['alg' => 'HS256', 'typ' => 'JWT'];
        $payload['exp'] = time() + $ttlSeconds;

        $segments = [
            self::urlsafeB64Encode(json_encode($header)),
            self::urlsafeB64Encode(json_encode($payload)),
        ];

        $signingInput = implode('.', $segments);
        $signature = hash_hmac('sha256', $signingInput, $secret, true);
        $segments[] = self::urlsafeB64Encode($signature);

        return implode('.', $segments);
    }

    public static function decode(string $jwt, string $secret): ?array
    {
        $parts = explode('.', $jwt);
        if (count($parts) !== 3) {
            return null;
        }

        [$headerB64, $payloadB64, $sigB64] = $parts;
        $signingInput = $headerB64 . '.' . $payloadB64;
        $signature = self::urlsafeB64Decode($sigB64);
        $expected = hash_hmac('sha256', $signingInput, $secret, true);

        if (!hash_equals($expected, $signature)) {
            return null;
        }

        $payload = json_decode(self::urlsafeB64Decode($payloadB64), true);
        if (!$payload || (isset($payload['exp']) && time() > $payload['exp'])) {
            return null;
        }

        return $payload;
    }

    private static function urlsafeB64Encode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private static function urlsafeB64Decode(string $data): string
    {
        $remainder = strlen($data) % 4;
        if ($remainder) {
            $padLen = 4 - $remainder;
            $data .= str_repeat('=', $padLen);
        }
        return base64_decode(strtr($data, '-_', '+/'));
    }
}

