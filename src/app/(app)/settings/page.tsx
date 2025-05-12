"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Settings, UserCircle, Bell, Shield, Palette, Save } from "lucide-react";
import React from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SettingsPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Placeholder for saving settings
    toast({
      title: "Settings Saved",
      description: "Your settings have been (simulated) saved.",
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <Settings className="mr-3 h-8 w-8 text-primary" />
          Application Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your profile, preferences, and application settings.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UserCircle /> Profile Information</CardTitle>
            <CardDescription>Update your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="displayName">Display Name</Label>
                <Input id="displayName" defaultValue="Irfan Admin" />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="admin@mahardika.co" disabled />
              </div>
            </div>
            <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell us a little about yourself" defaultValue="Lead administrator for Mahardika Insurance Portal." />
            </div>
            <div>
                <Label htmlFor="avatarUrl">Avatar URL</Label>
                <Input id="avatarUrl" placeholder="https://example.com/avatar.png" defaultValue="https://picsum.photos/seed/user1/128/128" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bell /> Notification Preferences</CardTitle>
            <CardDescription>Manage how you receive notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2 p-2 rounded-md hover:bg-muted/50">
              <Label htmlFor="emailNotifications" className="flex flex-col space-y-1">
                <span>Email Notifications</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Receive important updates and renewal reminders via email.
                </span>
              </Label>
              <Switch id="emailNotifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2 p-2 rounded-md hover:bg-muted/50">
              <Label htmlFor="pushNotifications" className="flex flex-col space-y-1">
                <span>Push Notifications</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Get real-time alerts on your device. (Requires browser permission)
                </span>
              </Label>
              <Switch id="pushNotifications" />
            </div>
             <div className="flex items-center justify-between space-x-2 p-2 rounded-md hover:bg-muted/50">
              <Label htmlFor="whatsappNotifications" className="flex flex-col space-y-1">
                <span>WhatsApp Reminders</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Receive policy renewal reminders on WhatsApp.
                </span>
              </Label>
              <Switch id="whatsappNotifications" defaultChecked />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Palette /> Theme & Appearance</CardTitle>
            <CardDescription>Customize the look and feel of the application.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2 p-2">
                <Label htmlFor="themeToggle" className="flex flex-col space-y-1">
                    <span>Interface Theme</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                    Select your preferred light or dark mode.
                    </span>
                </Label>
                <ThemeToggle />
            </div>
          </CardContent>
        </Card>


        <Card className="shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Shield /> Security Settings</CardTitle>
            <CardDescription>Manage your account security.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline">Change Password</Button>
            <p className="text-sm text-muted-foreground">
              Last password change: 3 months ago.
            </p>
            {/* Placeholder for Two-Factor Authentication */}
            <div className="flex items-center justify-between space-x-2 p-2 border rounded-md">
              <Label htmlFor="2fa" className="flex flex-col space-y-1">
                <span>Two-Factor Authentication (2FA)</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Enhance your account security. (Coming Soon)
                </span>
              </Label>
              <Button variant="secondary" disabled>Enable 2FA</Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end pt-2">
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" /> Save All Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
