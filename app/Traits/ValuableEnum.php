<?php

namespace App\Traits;

trait ValuableEnum
{
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
