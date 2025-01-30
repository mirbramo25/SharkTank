[[Mobile] Automatic sync with GitHub on iOS (for free) via a-shell](/t/mobile-automatic-sync-with-github-on-ios-for-free-via-a-shell/46150)

Follow the steps [from this GitHub article ](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) to generate an SSH key

## Generate/Pair SSH key:

>  Generate an SSH key
``` 
 ssh-keygen -t ed25519 -C "mirbramo25@gmail.com"
 ```  

>  Get the public key
```
cd
```

```
cd .ssh/
```

```
head id_ed25519.pub
```

>  Settings → SSH and GPG keys → New SSH key

 Name device and paste key

## go to folder:

>run
```
pickFolder
```
> When the pop-up opens select  
`On my iPhone → Obsidian` then click Done

> The working directory should now be the Obsidian files folder. A-shell auto-names the folder `Documents`. To change: 

---
```
renamemark Shortcuts_Backups sc
```

```
renamemark com~apple~CloudDocs icloud
```
---
 4. See bookmarks by running
```
showmarks
```
‎ 
> Go to folder want to sync
```
jump obsidian
```

```
mkdir scriptable
```

```
cd scriptable
```
---
## lg2 set up:

```
lg2 init .
```

---
```
lg2 remote add origin git@github.com:mirbramo25/Datajar.git
```
---
```
lg2 config user.identityFile '/var/mobile/Containers/Data/Application/EC808E14-C9A0-48C6-B95E-EC2423C97DF5/Documents/.ssh/id_ed25519'
```

```
lg2 config user.password 'say'
```

```
lg2 config user.name "ASHELL_MINI"
```

```
lg2 config user.email "mirbramo25@gmail.com"
```
‎ 
> If online repo has stuff
```
lg2 pull origin
```

```
lg2 checkout main
```
‎ 
> If nothing in online repo
```
lg2 checkout -b main
```
‎ 
> Test ssh

```
ssh -T git@github.com
```

## Push

---
```
jump obsidian
```

```
cd scriptable
```
---

```
lg2 add .
```

```
lg2 commit -m "updating from phone"
```

```
lg2 push origin
```

## Pull

---
```
jump obsidian
```

```
cd Shortcuts_Backups
```
---
```
lg2 pull origin
```  

 1. Push Shortcut ([Link](https://www.icloud.com/shortcuts/5da947b902d6414a9258c725cbaec94a))  
  .
 2. Pull Shortcut ([Link](https://www.icloud.com/shortcuts/a4f2cb5f95aa49b59c67069633ac81a5))

 
### Automate push/pull:

 * For pulling: 
 1. To automate pulling from GitHub on startup, I created another Shortcut ([link](https://www.icloud.com/shortcuts/24970d885de445a2acaadc4532e2b665)) that would call the ‘Obsidian pull’ shortcut (created in the last step) and then open the Obsidian app
 2. Add this Shortcut to the home screen to replace Obsidian (app icon [link](https://forum.obsidian.md/t/i-dont-like-obsidian-app-icon-am-i-alone/775/41))
 3. Optionally, disable Obsidian from appearing in the search menu (Settings → Obsidian → Siri & Search → Show App in Search) so that this shortcut is the only way to launch it
 * For pushing: 
 1. This one is a little more tricky. I created Shortcut Automations that trigger whenever the Obsidian app is open or closed, then waits two minutes before pushing. If the app is closed and re-opened within two minutes the push doesn’t go through. A link to the Shortcut that triggers [when Obsidian is closed is here](https://www.icloud.com/shortcuts/a9eb5b2fae364097b87ff340b2cb6466), and a link to the Shortcut that triggers [when Obsidian is opened is here](https://www.icloud.com/shortcuts/2b142c932978443d9ef5a8c248b028fb). (If the Shortcuts folder doesn’t exist in Files, you’ll have to create it.) A downside to this method is that locking the phone with Obsidian still running doesn’t trigger a push, as iOS still considers the app ‘open’. Additionally, while working in the app for a long time, a push is never triggered. If anyone has any better ideas about how best how/when to push please let me know.

### Other notes

 * I started learning how to use the shell and git about two weeks ago (and just to start synchronising my vault across devices), so I apologise if some of the steps are clunky or inefficient.
 * I’m pretty new to Obsidian as well and my vault is pretty small. The pushing/pulling might be too slow to be used reliably on larger vaults.
 * I tried using Automations to run the push/pull Shortcuts directly when Obsidian is open or closed, but they run whenever the app is minimised or un-minimised, which became cumbersome quickly.
 * Opening the app through a Shortcut that pulls from GitHub then launches Obsidian has worked pretty well so far for me, but I would like to have a better way to push.

18 Likes

## Comments

[My Git backup workflow on iOS (better than Working Copy)](https://forum.obsidian.md/t/my-git-backup-workflow-on-ios-better-than-working-copy/52966)

[Meta Post - Syncing between Devices](https://forum.obsidian.md/t/meta-post-syncing-between-devices/20983/38)

[[Mobile] Setting up iOS git-based syncing with mobile app (using Working Copy)](https://forum.obsidian.md/t/mobile-setting-up-ios-git-based-syncing-with-mobile-app-using-working-copy/16499/44)

[Sync iOS and windows 10 without subscription](https://forum.obsidian.md/t/sync-ios-and-windows-10-without-subscription/56776/5)

[Multiple vaults, same environment settings?](https://forum.obsidian.md/t/multiple-vaults-same-environment-settings/50251/8)

[Syncing across devices and collaborating](https://forum.obsidian.md/t/syncing-across-devices-and-collaborating/53549/3)

[Sync Options](https://forum.obsidian.md/t/sync-options/57215/3)

[[Mobile] Setting up iOS git-based syncing with mobile app (using Working Copy)](https://forum.obsidian.md/t/mobile-setting-up-ios-git-based-syncing-with-mobile-app-using-working-copy/16499/58)

[IOs crashes & left menu disappearing](https://forum.obsidian.md/t/ios-crashes-left-menu-disappearing/58557/2)

[Meta Post - Syncing between Devices](https://forum.obsidian.md/t/meta-post-syncing-between-devices/20983)

[Ios sync and drive (synology), yeah again](https://forum.obsidian.md/t/ios-sync-and-drive-synology-yeah-again/61803/2)

[Git plugin on Windows: error: fatal: Invalid object name '"\--pretty=format'](https://forum.obsidian.md/t/git-plugin-on-windows-error-fatal-invalid-object-name-pretty-format/89446/4)

[Iphone Obsidian Git Pull Broken, nothing has changed between today and yesterday](https://forum.obsidian.md/t/iphone-obsidian-git-pull-broken-nothing-has-changed-between-today-and-yesterday/67335/24)

[How to sync Obsidian to iOS via GitHub?](https://forum.obsidian.md/t/how-to-sync-obsidian-to-ios-via-github/82070)

[Iphone Obsidian Git Pull Broken, nothing has changed between today and yesterday](https://forum.obsidian.md/t/iphone-obsidian-git-pull-broken-nothing-has-changed-between-today-and-yesterday/67335/6)

[pmbauer](https://forum.obsidian.md/u/pmbauer) October 26, 2022, 2:43am 2

Thanks for that detailed write-up. I linked it here for visibility.

![](https://forum.obsidian.md/user_avatar/forum.obsidian.md/eleanorkonik/48/6180_2.png) [Meta Post - Syncing between Devices](https://forum.obsidian.md/t/meta-post-syncing-between-devices/20983) [Meta](/c/meta/16)

> The official documentation for [syncing Obsidian across devices](https://help.obsidian.md/Getting+started/Sync+your+notes+across+devices) is a great place to start. If you have ideas to improve the Obsidian documentation, pull requests are welcome. You can contribute to the process of [documenting Obsidian on GitHub](https://github.com/obsidianmd/obsidian-docs). First things first: Obsidian Sync vs. Third Party Sync. The advantages of [Obsidian Sync](https://obsidian.md/sync) is that it’s officially supported, “just works,” has nice versioning that is built into Obsidian, and is blazing fast and optimized for your vault. The main tradeoff is… 

3 Likes

[CawlinTeffid](https://forum.obsidian.md/u/CawlinTeffid) October 26, 2022, 3:38am 3

Great writeup — and all the more impressive given only 2 weeks experience with shell and git!

[zanodor](https://forum.obsidian.md/u/zanodor) October 26, 2022, 5:12pm 4

Thanks for a great tutorial.

I have had to put in my own 2-3 weeks worth of learning about Git.

A couple of remarks to your post, if I may:

An 
```
lg2 pull
```
 is always a good idea and a good habit to have before add + commit + push as any merges must happen locally rather than on the host.

The command 
```
lg2 add .
```
 was a welcome introduction because it will handle adding all untracked files (any deletions and additions of files not yet on the repo) as well. It is superior to 
```
lg2 add -u
```
.

With 
```
pickFolder
```
 I bookmarked my repository folder thus there is no need for the 
```
cd
```
 (change directory) command (which if I remember right, did not even work for me when run from the shortcut).

Instead of your 
```
echo
```
 command I run 
```
lg2 status
```
 to see if everything was done correctly. If you are on branch, you are good to go.

On my larger repo I need to put in the commands one by one in the A-Shell terminal and wait it all out. The cloning process has no problems though. There is no memory or timeout issues, fortunately. 
In case I might have any issues, I have set up an automated zip archive shortcut that copies the zips to my iCloud folder (from its browser website only compressed files can be downloaded in a batch, not folders, hence the idea). 
(For me, the reason to leave iCloud for Git was not handling the myriad small files correctly [as I need to edit them with Notepad++ from time to time], but larger files are uploaded instantly, though.)

On my smaller repo, the Obsidian Git plugin runs smoothly (on iPad as well). As discussed elsewhere, there one needs to use the 
```
https
```
 protocol instead of 
```
git
```
 with the ssh keys. 
What I do is open the 
```
config
```
 file in the 
```
.git
```
 folder in the [Taio](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjbga7nrv76AhWrgP0HHYLBA2wQFnoECA8QAQ&url=https%3A%2F%2Fapps.apple.com%2Fus%2Fapp%2Ftaio-markdown-text-actions%2Fid1527036273&usg=AOvVaw0p4BBhF50wf-RDXu0TrSTc) app (which sees the hidden folders that the iOS Files app doesn’t show) and edit from Taio (e.g. if I need to make any changes in the URL format or delete the superfluous keychain password).

4 Likes

[siris](https://forum.obsidian.md/u/siris) October 27, 2022, 12:53pm 5

Thanks for the feedback.

The whole reason I did this was because I thought the Obsidian Git plugin was incompatible with iOS. I searched around to see if anyone had a workaround, but all I saw were the posts I linked above about using different apps to interface between Obsidian and GitHub. Could you share how you got Obsidian Git to work on your iPad in more detail (or link to the ‘elsewhere’ you mention)?

[zanodor](https://forum.obsidian.md/u/zanodor) October 27, 2022, 4:46pm 6

Hi,

Unfortunately, I don’t remember which link I should give you to go on. (I may have garnered extra info from [here](https://github.com/denolehov/obsidian-git), though.)

I can safely recommend you just go ahead and install the Obsidian Git plugin and in the upper right hand corner follow the messages the plugin gives you. 
At some point it will ask you for the GitHub user name and the password (I use the token string instead). 
(If the dialog disappears in the meantime, you just go into the plugin settings and put in your details; once you enter your password, it will remember it so don’t worry about the empty record there.)

If you have authentication issues (which probably you will), you go into your repo folder, then in the 
```
.git
```
 folder find the 
```
config
```
 file. I recommend not using Linux commands but using the GUI of Taio, as I mentioned. 
In there, you need to change

> url = [[email protected]](/cdn-cgi/l/email-protection#03646a7743646a776b76612d606c6e):<username>/<repo-name>.git

to

> url = <https://github.com/><username>/<repo-name>.git

That is you need to change 
```
git@
```
 to 
```
https://
```
 and the colon to a slash in the URL. Username and repo-name are self-explanatory.

Because now you have two kinds of auth methods (passwords) (one created for SSH from A-Shell and one given for Obsidian Git), you need to delete the last two lines from your 
```
config
```
 file (because Obsidian Git doesn’t use the SSH protocol). These two:

> identityFile = id_ecdsa 
password = “somepassword”

 * I recommend copying these lines somewhere for future reference (I use [AnyBuffer](https://apps.apple.com/us/app/anybuffer/id1330815414)).

After that, Obsidian Git should work properly on the iPad, provided it is not a huge repo/vault (otherwise you’ll likely run out of memory). 
Should you want to go back to A-Shell now to pull or push, LibGit2 will conduct its business through the https protocol and thus ask for your password/token (which you either put in as you go or have it cached in but I did not manage to do that). 
If your repo is relatively small, you wouldn’t need to go back to A-Shell to fiddle with pull/add/commit/push or any passwords. I am not so lucky.

Hope this helps,

Cheers

2 Likes

[Obsidian Git - Plugin for automatic vault backup with git](https://forum.obsidian.md/t/obsidian-git-plugin-for-automatic-vault-backup-with-git/7790/50)

[lesserror](https://forum.obsidian.md/u/lesserror) November 1, 2022, 1:55pm 7

![](https://forum.obsidian.md/letter_avatar_proxy/v4/letter/s/ecccb3/48.png) siris:

> Push Shortcut

Regarding Pull Shortcut and Push Shortcut, I see an extra " cd " command in front of the shortcut command on my phone, what is the reason for this?

[lesserror](https://forum.obsidian.md/u/lesserror) November 3, 2022, 5:57am 8

Thanks for the great tutorial, but I’m running into some snags here regarding For pushing. I’m not quite sure how to configure the Shortcut you gave me to trigger when obsidian is started or closed, can you provide me with an example of how to trigger it? And what does the directory Shortcuts stand for? Can you tell me more about it?

[siris](https://forum.obsidian.md/u/siris) November 3, 2022, 8:29pm 9

The starting 
```
cd
```
 was just to get back to the root/default Documents folder. I thought at the time that it was necessary to 
```
jump
```
 from root to wherever, but that’s not the case. It shouldn’t break anything, but it’s not necessary either.

[siris](https://forum.obsidian.md/u/siris) November 3, 2022, 8:57pm 10

I glossed over how I set up the automated part because I wasn’t (and still am not) entirely satisfied with its smoothness. Hopefully the below points can answer your questions:

 * For the push Automations to work, a 
```
Shortcuts
```
 folder must exist within the Files app under ‘On my iPhone’. To create it, I used a-shell and 
```
pickFolder
```
-ed the entire ‘On my iPhone’ directory, then ran 
```
mkdir Shortcuts
```
 to create it. There might be an easier/more graphical way, but that’s how I did it. Inside this folder, the automation Shortcuts store a boolean ‘variable’, 
```
needToPush.txt
```
, that each one can read/write. (I already had this folder made and am using it for other Automations so it felt natural to use it here; sorry if it caused any confusion.)
 * There are two [Automations](https://support.apple.com/guide/shortcuts/create-a-new-personal-automation-apdfbdbd7123/ios): one that triggers ‘When “Obsidian” is closed’, and one that triggers ‘When “Obsidian” is opened’. For both I disabled ‘ask before running’ and ‘notify when run’.
 * Inside the Automation that runs when Obsidian is **opened**, the only action is ‘Run Shortcut’ **
```
noPushNeeded
```
**
 * Inside the Automation that runs when Obsidian is **closed**, the only action is ‘Run Shortcut’ **
```
pushIfNeeded
```
** (poor naming convention on my part)
 * the 
```
pushIfNeeded
```
 shortcut’s wait time can be adjusted by changing the number of times the 
```
repeat
```
 runs or directly decreasing the 
```
wait
```
 command’s time. I found that if I waited too long, though, the automation would fail to trigger. Decreasing the wait time may be useful in testing if the Automation is set up correctly

2 Likes

[arnx.3](https://forum.obsidian.md/u/arnx.3) November 5, 2022, 9:25am 11

after * 
```
lg2 pull origin
```
 
i can not add user or email 
any idea? 
and pc’s font size in mobile is disturbing any idea on that too?

[arnx.3](https://forum.obsidian.md/u/arnx.3) November 5, 2022, 10:32am 12

can we puch to same branch ? 
main branch 
this is craeting a new branch called master so can we puch into main?

[siris](https://forum.obsidian.md/u/siris) November 5, 2022, 6:19pm 13

![](https://forum.obsidian.md/letter_avatar_proxy/v4/letter/a/e19b73/48.png) arnx.3:

> after * 
```
lg2 pull origin
```
 
i can not add user or email

I’m not sure what the issue would be without knowing what error message you’re getting. Googling the message would probably turn up a better answer than I could give, but if that doesn’t work post here and we can try to figure it out.

![](https://forum.obsidian.md/letter_avatar_proxy/v4/letter/a/e19b73/48.png) arnx.3:

> pc’s font size in mobile is disturbing any idea on that too?

Running 
```
help
```
 in a-shell lists a bunch of commands. Some of them can change the appearance of the terminal (different colour, font size, etc.)

![](https://forum.obsidian.md/letter_avatar_proxy/v4/letter/a/e19b73/48.png) arnx.3:

> can we puch to same branch ? 
main branch 
this is craeting a new branch called master so can we puch into main?

Seems like 
```
lg2
```
’s default branch is named ‘master’, and since mine is as well I didn’t consider people who call theirs ‘main’. To create a local ‘main’ branch, try running 
```
lg2 checkout -b main
```
 and then 
```
lg2 checkout main
```
. You might have to redo pull steps. I haven’t tested this as well, so let me know if it works out.

Alternatively (and what I probably should have written in my original post), a more elegant method may be to use 
```
lg2 clone [[email protected]](/cdn-cgi/l/email-protection):USERNAME/REPO-NAME.git
```
 in the 
```
obsidian
```
 folder instead of running 
```
lg2 init .
```
 inside 
```
obsidian/Shortcuts_Backups
```
. I haven’t tested that, though, so let me what you do and what ends up working.

[arnx.3](https://forum.obsidian.md/u/arnx.3) November 7, 2022, 2:00pm 15

i merged the branches in github website . 
can we push directly to main branch ? 
it would make the workflow frictionless 
any way to directly push to main branch

[_timeSensitive](https://forum.obsidian.md/u/_timeSensitive) November 27, 2022, 9:20pm 17

[@siris](/u/siris) thanks so much, this guide worked great for me, after trying and failing at a few other methods (including just using Obsidian Git on the iOS app. no dice.).

[@arnx.3](/u/arnx.3) thanks for having the same problem I did at first! I got stuck with the pushing and pulling steps. Not shortcuts/automation, just running the push/pull manually in a-shell did not seem to work at first. Thanks to you comment, I realized that the branch in my existing Github repo was ‘main’, while lg2 was trying to push/pull to/from ‘master’

To solve this, I ended up deleting Obsidian and all the data, so as to clear the repo from my phone, and run the whole tutorial over again. But this time, I followed [@siris](/u/siris) instruction from the comment above:

> a more elegant method may be to use 
```
lg2 clone [[email protected]](/cdn-cgi/l/email-protection):USERNAME/REPO-NAME.git
```
 in the 
```
obsidian
```
 folder instead of running 
```
lg2 init .
```
 inside 
```
obsidian/Shortcuts_Backups
```
.

Worked great. Thanks so much all.

3 Likes

[chedan](https://forum.obsidian.md/u/chedan) December 3, 2022, 12:34pm 19

thanks for your sharing that helps me a lot. ![:+1:](https://forum.obsidian.md/images/emoji/apple/+1.png?v=12)

[chedan](https://forum.obsidian.md/u/chedan) December 3, 2022, 12:47pm 20

Thank you very much. 
In the beginning, I used password instead of token, which led to an error. 
According to [git-password-authentication-is-shutting-down](https://github.blog/changelog/2021-08-12-git-password-authentication-is-shutting-down/), only token can take effect.

[arnx.3](https://forum.obsidian.md/u/arnx.3) January 19, 2023, 3:05pm 22

![image](https://forum.obsidian.md/uploads/default/optimized/3X/d/0/d07b1fcdb8f51720f5ba760ec594c750cbe1748a_2_281x499.jpeg)

[ image750×1334 200 KB

](https://forum.obsidian.md/uploads/default/original/3X/d/0/d07b1fcdb8f51720f5ba760ec594c750cbe1748a.jpeg)

Anyone help Im stuck here dont know what to do to fix it

[zanodor](https://forum.obsidian.md/u/zanodor) January 19, 2023, 7:12pm 23

[@arnx.3](/u/arnx.3) After 1 month you are still at it? Are you still having Git issues?

Then why don’t you use [GitViewer](https://apps.apple.com/us/app/gitviewer/id1622656471) (the Demo version will be fine/*) instead? Just use the GitViewer authentification ([register it on GitHub](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)) and you can push for free (which [Working Copy](https://apps.apple.com/us/app/working-copy-git-client/id896694807) doesn’t allow). 
With GitViewer, you can also pick any folder, including Obsidian’s local folder. 
Downside is that add+commit will be slow using GitViewer.

/* Unfortunately, you need to pick your Obsidian folder every time you use the app since the Demo version doesn’t save your private repo, but at least the SSH key provided by GitViewer is constant (I reckon it will be different for each user but since it’s a demo version, I have no way of knowing).

[siris](https://forum.obsidian.md/u/siris) January 20, 2023, 1:10am 24

I ran into this issue a few days ago after updating a-shell. I think they re-structured some stuff behind-the-scenes. I fixed it by running the following:
 
 
 cd
 cd .ssh
 pwd -P
 
 
 
 
 
 The last command outputs the full path to the .ssh folder. Copy it, then jump obsidian back to your vault and run lg2 config user.identityFile NEW_PATH, where NEW_PATH is the path you copied (ending in /.ssh) + /id_ed25519.pub
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 **[next page →](/t/mobile-automatic-sync-with-github-on-ios-for-free-via-a-shell/46150?page=2)**
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 * 
 
 [Home ](/)
 
 
 
 
 * 
 
 [Categories ](/categories)
 
 
 
 
 * 
 
 [Guidelines ](/guidelines)
 
 
 
 
 * 
 
 [Terms of Service ](https://obsidian.md/terms)
 
 
 
 
 * 
 
 [Privacy Policy ](https://obsidian.md/privacy)
 
 
 
 
 
 
 
 Powered by [Discourse](https://www.discourse.org), best viewed with JavaScript enabled