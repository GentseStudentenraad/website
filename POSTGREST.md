# Initialisatie PostgREST

PostgREST is een _instant REST API_ met behulp van databank introspectie. Om deze te initialiseren dient er een anonieme gebruiker aangemaakt te worden.

```SQL
create role web_anon nologin;

grant usage on schema public to web_anon;
grant select on public.news to web_anon;
```

Via de authenticator rol zal PostgREST via _minimal priviliges_ de query uitvoeren. Iedere rol die gebruikt kan worden via PostgREST dient dus onderdeel te zijn van authenticator.

```SQL
create role authenticator noinherit login password 'mysecretpassword';
grant web_anon to authenticator;
```
