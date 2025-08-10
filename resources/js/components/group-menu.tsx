import { Group } from '@/types/store';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

function renderGroup(item: Group): JSX.Element {
    const isActiveTree = item.activeGroup || item.parent_id != 0;

    return (
        <>
            {item.all_subgroups.length == 0 ? (
                <li key={item.id}>
                    <Link href={route('store.group', item.id)} className='cursor-pointer hover:text-yellow-500'>{item.name} ({item.tree_products_count})</Link>
                </li>
            ) : (
                <li key={item.id}>
                    <div className="align-center flex gap-2">
                        <Link href={route('store.group', item.id)} className='cursor-pointer hover:text-yellow-500'>{item.name} ({item.tree_products_count})</Link>
                    </div>
                    <ul id={`${item.id}.menu`} className={cn('pl-6.5 border-l-1 border-dashed', isActiveTree ? '' : 'hidden')}>
                        {item.all_subgroups.map((item) => renderGroup(item))}
                    </ul>
                </li>
            )}
        </>
    );
}

function GroupMenu({ groups, title = 'Категории' }: { groups: Group[], title?: string }): JSX.Element {
    return (
        <div className="flex flex-col gap-4">
            <span className='font-semibold py-1.5'>{ title }</span>
            <ul>{groups.map((item: Group) => renderGroup(item))}</ul>
        </div>
    );
}

export { GroupMenu };
