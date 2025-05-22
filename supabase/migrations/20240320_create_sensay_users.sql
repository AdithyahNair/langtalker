-- Create a table for storing Sensay user IDs
create table if not exists public.sensay_users (
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

-- Create function to automatically set updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create trigger for updated_at
create trigger handle_updated_at
    before update on public.sensay_users
    for each row
    execute procedure public.handle_updated_at(); 