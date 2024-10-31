import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  name: string;
  image?: string;
  online?: boolean;
  size?: 'default' | 'lg';
}

export function UserAvatar({
  name,
  image,
  online,
  size = 'default',
}: UserAvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="relative">
      <Avatar
        className={cn(
          'relative',
          size === 'lg' && 'h-24 w-24'
        )}
      >
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      {online !== undefined && (
        <span
          className={cn(
            'absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background',
            online ? 'bg-green-500' : 'bg-muted',
            size === 'lg' && 'h-4 w-4'
          )}
        />
      )}
    </div>
  );
}