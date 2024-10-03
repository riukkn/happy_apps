# Pulling ubuntu image with a specific tag from the docker hub.
FROM ubuntu:18.04

# Updating the packages and installing cron and vim editor if you later want to edit your script from inside your container.
RUN apt-get update \  
&& apt-get install cron -y && apt-get install vim -y

# Crontab file copied to cron.d directory.
COPY ./files/cronjob /etc/cron.d/container_cronjob

# Script file copied into container.
COPY ./files/script.sh /script.sh

# Giving executable permission to script file.
RUN chmod +x /script.sh

# Running commands for the startup of a container.
CMD ["/bin/bash", "-c", "/script.sh && chmod 644 /etc/cron.d/container_cronjob && cron && tail -f /var/log/cron.log"]