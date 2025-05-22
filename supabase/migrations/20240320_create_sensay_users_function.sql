-- Function to create sensay_users table if it doesn't exist
create or replace function public.create_sensay_users_table()
returns void as $$
begin
    -- Check if table exists
    if not exists (
        select from pg_tables
        where schemaname = 'public'
        and tablename = 'sensay_users'
    ) then
        -- Create the table
        create table public.sensay_users (
            id uuid references auth.users on delete cascade primary key,
            sensay_user_id text not null,
            email text not null,
            created_at timestamp with time zone default timezone('utc'::text, now()) not null,
            updated_at timestamp with time zone default timezone('utc'::text, now()) not null
        );

        -- Enable RLS
        alter table public.sensay_users enable row level security;

        -- Create policies
        create policy "Users can view their own sensay user data."
            on public.sensay_users for select
            using ( auth.uid() = id );

        create policy "Users can update their own sensay user data."
            on public.sensay_users for update
            using ( auth.uid() = id );

        -- Create updated_at trigger
        create trigger handle_updated_at
            before update on public.sensay_users
            for each row
            execute function public.handle_updated_at();
    end if;
end;
$$ language plpgsql security definer; 