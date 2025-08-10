<?php

namespace App\Services;

use App\Models\Group;
use Illuminate\Database\Eloquent\Collection;

class GroupService
{
    protected ?Collection $groupsTree = null;

    public function __construct()
    {
        $this->groupsTree = $this->getGroupsTree();
    }

    public function getGroupsTree(?Group $activeGroup = null): Collection
    {
        if (!empty($this->groupsTree)) {
            if (!empty($activeGroup)) {
                $parentGroupId = Group::getFirstParentId($activeGroup);
                $this->groupsTree->find($parentGroupId)->activeGroup = true;
            }

            return $this->groupsTree;
        }

        $groupsTree = Group::query()->where('parent_id', 0)->with('allSubgroups')->withCount('products')->get();

        if (!empty($activeGroup)) {
            $parentGroupId = Group::getFirstParentId($activeGroup);
            $groupsTree->find($parentGroupId)->activeGroup = true;
        }

        foreach ($groupsTree as &$group) {
            $this->calculateTreeProductsCountForGroupTree($group);
        }

        return $groupsTree;
    }

    protected function calculateTreeProductsCountForGroupTree(Group &$group): void
    {
        $subgroups = $group->allSubgroups;
        if ($subgroups->isNotEmpty()) {
            foreach ($subgroups as $subgroup) {
                $this->calculateTreeProductsCountForGroupTree($subgroup);
            }
        }

        $group->tree_products_count = $this->calculateTreeProductsCountForGroup($group);
    }

    protected function calculateTreeProductsCountForGroup(Group $group): int
    {
        $subgroups = $group->allSubgroups;
        $sum = $group->products_count;

        if ($subgroups->isEmpty()) {
            return $sum;
        }

        foreach ($subgroups as $subgroup) {
            if (!empty($subgroup->tree_products_count)) {
                $sum += $subgroup->tree_products_count;
                continue;
            }

            $sum += $this->calculateTreeProductsCountForGroup($subgroup);
        }

        return $sum;
    }

    public function flattenGroupsTree(Collection $groupsTree): Collection
    {
        if ($groupsTree->isEmpty()) {
            return $groupsTree;
        }

        $items = new Collection();

        foreach ($groupsTree as $groupTree) {
            $items->push(...$this->flattenGroupTree($groupTree));
        }

        return $items;
    }

    public function flattenGroupTree(Group $group): Collection
    {
        $items = new Collection([$group]);
        $groupInTree = $this->findGroupInTreeCollection($group, $this->getGroupsTree());
        $subgroups = $groupInTree->allSubgroups;

        if ($subgroups->isEmpty()) {
            return $items;
        }

        foreach ($subgroups as $subgroup) {
            $items->push(...$this->flattenGroupTree($subgroup)->toArray());
        }

        return $items;
    }

    protected function findGroupInTreeCollection(Group $group, Collection $tree): ?Group
    {
        $result = null;

        foreach ($tree as $node) {
            if (!empty($result)) {
                break;
            }

            if ($node->id == $group->id) {
                $result = $node;
                break;
            }

            $subgroups = $node->allSubgroups;
            if ($subgroups->isEmpty()) {
                continue;
            }

            $result = $this->findGroupInTreeCollection($group, $subgroups);
        }

        return $result;
    }
}
