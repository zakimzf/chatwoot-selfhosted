json.id @inbox.id
json.channel_id @inbox.channel_id
json.name @inbox.name
json.channel_type @inbox.channel_type
json.website_token @inbox.channel.website_token
json.widget_color @inbox.channel.widget_color
json.web_widget_script @inbox.channel.try(:web_widget_script)