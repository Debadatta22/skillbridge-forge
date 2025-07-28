import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Lock, Globe, Save, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';

const Settings: React.FC = () => {
  const [profileData, setProfileData] = useState({
    fullName: 'Demo IndExpert',
    email: 'expert@example.com',
    company: 'Tech Solutions Inc.',
    expertise: 'Full Stack Development',
    experience: '8',
    bio: 'Experienced software developer passionate about mentoring the next generation of developers.',
    linkedin: 'https://linkedin.com/in/demoexpert',
    website: 'https://demoexpert.com'
  });

  const [notifications, setNotifications] = useState({
    emailMentoring: true,
    emailInterviews: true,
    emailNewStudents: false,
    pushMentoring: true,
    pushInterviews: true,
    pushNewStudents: true,
    weeklyDigest: true,
    monthlyReport: false
  });

  const [availability, setAvailability] = useState({
    timezone: 'America/New_York',
    maxStudents: '10',
    sessionDuration: '60',
    availableDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  });

  // TODO: PUT /api/expert/settings
  const handleSaveProfile = () => {
    console.log('Saving profile:', profileData);
    // Show success toast
  };

  const handleSaveNotifications = () => {
    console.log('Saving notifications:', notifications);
    // Show success toast
  };

  const handleSaveAvailability = () => {
    console.log('Saving availability:', availability);
    // Show success toast
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <SettingsIcon className="h-6 w-6 text-gray-600" />
          Settings
        </h1>
        <p className="text-muted-foreground">Manage your profile, preferences, and account settings</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Update your professional profile and expertise details
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="company">Company/Organization</Label>
                  <Input
                    id="company"
                    value={profileData.company}
                    onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Select value={profileData.experience} onValueChange={(value) => setProfileData({...profileData, experience: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="6-8">6-8 years</SelectItem>
                      <SelectItem value="9-12">9-12 years</SelectItem>
                      <SelectItem value="12+">12+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="expertise">Areas of Expertise</Label>
                <Input
                  id="expertise"
                  value={profileData.expertise}
                  onChange={(e) => setProfileData({...profileData, expertise: e.target.value})}
                  placeholder="e.g., React, Node.js, Python, UI/UX Design"
                />
              </div>

              <div>
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  placeholder="Tell students about your background and mentoring approach..."
                  rows={4}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    value={profileData.linkedin}
                    onChange={(e) => setProfileData({...profileData, linkedin: e.target.value})}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Personal Website</Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleSaveProfile} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Profile
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Preview Public Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Choose how and when you want to be notified
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Mentoring Requests</p>
                      <p className="text-sm text-muted-foreground">When students request mentoring sessions</p>
                    </div>
                    <Switch
                      checked={notifications.emailMentoring}
                      onCheckedChange={(checked) => setNotifications({...notifications, emailMentoring: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Interview Scheduling</p>
                      <p className="text-sm text-muted-foreground">Interview confirmations and reminders</p>
                    </div>
                    <Switch
                      checked={notifications.emailInterviews}
                      onCheckedChange={(checked) => setNotifications({...notifications, emailInterviews: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Student Applications</p>
                      <p className="text-sm text-muted-foreground">When new students apply for guidance</p>
                    </div>
                    <Switch
                      checked={notifications.emailNewStudents}
                      onCheckedChange={(checked) => setNotifications({...notifications, emailNewStudents: checked})}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Mentoring Session Reminders</p>
                      <p className="text-sm text-muted-foreground">15 minutes before scheduled sessions</p>
                    </div>
                    <Switch
                      checked={notifications.pushMentoring}
                      onCheckedChange={(checked) => setNotifications({...notifications, pushMentoring: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Interview Notifications</p>
                      <p className="text-sm text-muted-foreground">Real-time interview updates</p>
                    </div>
                    <Switch
                      checked={notifications.pushInterviews}
                      onCheckedChange={(checked) => setNotifications({...notifications, pushInterviews: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Applications</p>
                      <p className="text-sm text-muted-foreground">Instant notifications for new applications</p>
                    </div>
                    <Switch
                      checked={notifications.pushNewStudents}
                      onCheckedChange={(checked) => setNotifications({...notifications, pushNewStudents: checked})}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Digest Reports</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weekly Activity Digest</p>
                      <p className="text-sm text-muted-foreground">Summary of your mentoring activity</p>
                    </div>
                    <Switch
                      checked={notifications.weeklyDigest}
                      onCheckedChange={(checked) => setNotifications({...notifications, weeklyDigest: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Monthly Performance Report</p>
                      <p className="text-sm text-muted-foreground">Detailed analytics and insights</p>
                    </div>
                    <Switch
                      checked={notifications.monthlyReport}
                      onCheckedChange={(checked) => setNotifications({...notifications, monthlyReport: checked})}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveNotifications} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Availability Settings */}
        <TabsContent value="availability">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Availability & Preferences
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Set your mentoring availability and session preferences
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={availability.timezone} onValueChange={(value) => setAvailability({...availability, timezone: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">GMT</SelectItem>
                      <SelectItem value="Europe/Berlin">CET</SelectItem>
                      <SelectItem value="Asia/Tokyo">JST</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="maxStudents">Maximum Active Students</Label>
                  <Select value={availability.maxStudents} onValueChange={(value) => setAvailability({...availability, maxStudents: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select limit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 students</SelectItem>
                      <SelectItem value="10">10 students</SelectItem>
                      <SelectItem value="15">15 students</SelectItem>
                      <SelectItem value="20">20 students</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="sessionDuration">Default Session Duration</Label>
                <Select value={availability.sessionDuration} onValueChange={(value) => setAvailability({...availability, sessionDuration: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Available Days</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={day}
                        checked={availability.availableDays.includes(day)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAvailability({
                              ...availability,
                              availableDays: [...availability.availableDays, day]
                            });
                          } else {
                            setAvailability({
                              ...availability,
                              availableDays: availability.availableDays.filter(d => d !== day)
                            });
                          }
                        }}
                        className="rounded"
                      />
                      <label htmlFor={day} className="text-sm capitalize">
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={handleSaveAvailability} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Availability Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Security & Privacy
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage your account security and privacy settings
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Password</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button variant="outline">Update Password</Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable 2FA</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Privacy</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Profile Visibility</p>
                      <p className="text-sm text-muted-foreground">Show your profile to students looking for mentors</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Contact Information</p>
                      <p className="text-sm text-muted-foreground">Allow students to see your contact details</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4 text-red-600">Danger Zone</h3>
                <div className="p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20">
                  <p className="font-medium text-red-800 dark:text-red-200">Delete Account</p>
                  <p className="text-sm text-red-600 dark:text-red-300 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;