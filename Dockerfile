FROM qbittorrentofficial/qbittorrent-nox:5.1.4-lt2-2

# Switch to root to install StartOS-required dependencies
USER root

# Install dependencies:
#   bash      – needed by the startup wrapper
#   curl      – used by StartOS health checks
RUN apk add --no-cache \
    bash \
    curl

# Set environment variables consumed by the official entrypoint
ENV PUID=1000
ENV PGID=1000
ENV QBT_LEGAL_NOTICE=confirm
ENV QBT_WEBUI_PORT=8080
ENV QBT_TORRENTING_PORT=6881

# Copy and install the StartOS startup wrapper
COPY startos/start.sh /startos/start.sh
RUN chmod +x /startos/start.sh

# Persistent storage for downloads (separate from /config)
VOLUME ["/downloads"]
