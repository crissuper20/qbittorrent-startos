<table><tr>
<td><img src="icon.png" width="80"/></td>
<td>

## qBittorrent on StartOS

This .s9pk is the qBittorrent image from [qbittorrentofficial/qbittorrent-nox](https://hub.docker.com/r/qbittorrentofficial/qbittorrent-nox), packaged for StartOS 0.4.

</td>
</tr></table>

Already added qBittorrent as a dependency to Nextcloud and Jellyfin so you don't have to bother, get them at:

- https://github.com/crissuper20/nextcloud-startos.git
- https://github.com/crissuper20/jellyfin-startos.git

### For other service maintainers

To add qBittorrent as a dependency in **your** service's manifest:

```typescript
// In your manifest/index.ts
dependencies: {
  qbittorrent: {
    description: 'see stuff downloaded from qBittorrent',
    optional: true,
    metadata: {
      title: 'qBittorrent',
      icon: 'https://raw.githubusercontent.com/crissuper20/qbittorrent-startos/refs/heads/main/icon.png',
    },
  },
},
```

Then mount the `/downloads` volume in **your** service's `main.ts`:

```typescript
// In your main.ts
import { SDKManifest } from '@start9labs/start-sdk/base/lib/types/ManifestTypes'

interface QBittorrentManifest extends SDKManifest {
  readonly id: 'qbittorrent'
  readonly volumes: ('main' | 'downloads')[]
}

// Inside setupMain, add to your mounts chain:
mounts = mounts.mountDependency<QBittorrentManifest>({
  dependencyId: 'qbittorrent',
  volumeId: 'downloads',
  subpath: null,
  mountpoint: '/mnt/qbittorrent', // or wherever you want
  readonly: true,
})
```

Downloaded files will appear at the mountpoint automatically.
