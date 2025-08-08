<?php

namespace App\Enums\Store;

use App\Enums\Base;
use App\Traits\ValuableEnum;

enum PerPageParam: int implements Base
{
    use ValuableEnum;

    case SIX = 6;
    case TWELVE = 12;
    case EIGHTEEN = 18;
}
