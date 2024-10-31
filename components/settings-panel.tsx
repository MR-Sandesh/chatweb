"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { UserAvatar } from '@/components/user-avatar';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Camera,
  Mail,
  Phone,
  Shield,
  User,
  Code,
  X,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  emailVerified: boolean;
  phoneVerified: boolean;
}

export function SettingsPanel({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    emailVerified: false,
    phoneVerified: true,
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Settings</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <UserAvatar
                name={profile.name}
                image={profile.avatar}
                size="lg"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-primary-foreground hover:bg-primary/90 cursor-pointer"
              >
                <Camera className="h-4 w-4" />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <h2 className="text-xl font-semibold">{profile.name}</h2>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  Email
                  {profile.emailVerified ? (
                    <Badge variant="default" className="bg-green-500">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Unverified
                    </Badge>
                  )}
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                  {!profile.emailVerified && (
                    <Button variant="outline">Verify</Button>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  Phone Number
                  {profile.phoneVerified ? (
                    <Badge variant="default" className="bg-green-500">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Unverified
                    </Badge>
                  )}
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile((prev) => ({ ...prev, phone: e.target.value }))
                    }
                  />
                  {!profile.phoneVerified && (
                    <Button variant="outline">Verify</Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </h3>
            <div className="grid gap-4">
              <Button variant="outline" className="justify-start">
                Change Password
              </Button>
              <Button variant="outline" className="justify-start">
                Two-Factor Authentication
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Code className="h-5 w-5" />
              Developer Information
            </h3>
            <div className="rounded-lg border p-4 text-sm text-muted-foreground">
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">App Version:</span> 1.0.0
                </p>
                <p>
                  <span className="font-semibold">Build:</span> 2024.03.14
                </p>
                <p>
                  <span className="font-semibold">Developer:</span> Wave Team
                </p>
                <p>
                  <span className="font-semibold">Contact:</span>{' '}
                  developers@wave.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}