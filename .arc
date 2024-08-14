@app
retrotoot

@aws
architecture arm64
region us-east-1
runtime nodejs20.x

@plugins
enhance/arc-plugin-enhance

@static
compression true
fingerprint false
prune true

@tables
users
	apikey String
	encrypt true
	username *String
