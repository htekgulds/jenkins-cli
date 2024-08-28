# jenkins-cli
Yet another Jenkins cli tool (I could not find a decent one) written in Nodejs

## Setup

```sh
npm run build
npm link
```

## Usage

First connect to Jenkins server (save login info to config file):

```sh
jenkins login http://jenkins.mycompany.com
# Username?
# Password?
# Connection successful!

# connection details will be saved into a json config file so other commands can use it
```

Now we can use the commands:

```sh
# List of Jenkins jobs
jenkins job list

# output
┌──────────────────────┬──────────┐
│ Name                 │ Status   │
├──────────────────────┼──────────┤
│ helloworld           │ success  │
├──────────────────────┼──────────┤
│ another job          │ success  │
├──────────────────────┼──────────┤
│ what-the-job         │ error    │
└──────────────────────┴──────────┘

# Status of a single job
jenkins job get helloworld

# output
┌─────┬──────┬───────┬───────┬────────┐
│ Id  │ Test │ Build │ Image │ Deploy │
├─────┼──────┼───────┼───────┼────────┤
│ 5   │ 6s   │ 3s    │ 1m    │ 5s     │
├─────┼──────┼───────┼───────┼────────┤
│ 4   │ 5s   │ 4s    │ 53s   │ 5s     │
├─────┼──────┼───────┼───────┼────────┤
│ 3   │ 5s   │ 4s    │ 51s   │ 4s     │
├─────┼──────┼───────┼───────┼────────┤
│ 2   │ 4s   │ 4s    │ 52s   │ 4s     │
├─────┼──────┼───────┼───────┼────────┤
│ 1   │ 6s   │ 4s    │ 47s   │ 4s     │
└─────┴──────┴───────┴───────┴────────┘
```

  *Note: releases coming soon...*
