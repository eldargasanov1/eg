import { Group } from '@/types/store';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

function renderGroup(item: Group): JSX.Element {
    const isActiveTree = item.activeGroup || item.parent_id != 0;

    return (
        <>
            {item.all_subgroups.length == 0 ? (
                <Link href={route('store.group', item.id)} className='cursor-pointer hover:text-yellow-500'>{item.name} ({item.tree_products_count})</Link>
            ) : (
                <>
                    <div className="align-center flex gap-2">
                        <Link href={route('store.group', item.id)} className='cursor-pointer hover:text-yellow-500'>{item.name} ({item.tree_products_count})</Link>
                    </div>
                    <ul id={`${item.id}.menu`} className={cn('pl-6.5 border-l-1 border-dashed', isActiveTree ? '' : 'hidden')}>
                        {item.all_subgroups.map((item) => <li key={item.id}>{renderGroup(item)}</li>)}
                    </ul>
                </>
            )}
        </>
    );
}

function GroupMenu({ groups, title = 'Категории' }: { groups: Group[], title?: string }): JSX.Element {
    return (
        <div className="flex flex-col gap-4">
            <Link href={route('store.index')} className='font-semibold py-1.5'>{ title }</Link>
            <ul>{groups.map((item: Group) => <li key={item.id}>{renderGroup(item)}</li>)}</ul>
        </div>
    );
}

export { GroupMenu };
