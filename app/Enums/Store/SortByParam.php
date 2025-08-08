<?php

namespace App\Enums\Store;

use App\Enums\Base;
use App\Traits\ValuableEnum;

enum SortByParam : string implements Base
{
    use ValuableEnum;

    case PRICE_ASC = 'price-asc';
    case PRICE_DESC = 'price-desc';
    case NAME_ASC = 'name-asc';
    case NAME_DESC = 'name-desc';

    public function getParamName(): string
    {
        $param = explode('-', $this->value)[0];
        return $param;
    }

    public function getParamValue(): string
    {
        $value = explode('-', $this->value)[1];
        return $value;
    }
}
