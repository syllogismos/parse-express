## Parse App

Sample Parse, multiple page express app.

```
> parse new myapp
> cd myapp
> parse generate express
> parse develop app -- without deploying the project prematurely
> parse deploy -- deploying app
> parse rollback -- rolls back to previous version
```

## custom domain
CNAME: add a rule so that you direct from ```www.YOUR_DOMAIN.com``` to ```YOUR_APP_NAME.parseapp.com```  

for naked domains to work, you need to have a forwarding enabled, such that ```YOUR_DOMAIN.com``` forwards to ```www.YOUR_DOMAIN.com```.  
  
There is another way of doing this according to [parse docs](https://parse.com/docs/hosting_guide#custom). You need to create ```A``` record from ```YOUR_DOMAIN`` to one or both of the following ip addresses, ```54.85.233.145``` and ```54.85.226.190```. I haven't checked if this works.

But I got naked domains to work by having a forwarding rule that forwards ```YOUR_DOMAIN.com``` to ```www.YOUR_DOMAIN.com```