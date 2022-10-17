import axios from 'axios'
import RNFetchBlob from 'rn-fetch-blob'
import api from 'services/api'
import { handleError } from 'services/logger'
import { VIMEO_APP_TOKEN } from '@env'

class Vimeo {
  getVideoId = link => {
    link.match(
      /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/,
    )
    return RegExp.$6
  }

  getExternalUrl = id => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `https://api.vimeo.com/me/videos/${id}?fields=files,pictures,upload.status,transcode.status`,
        headers: {
          Authorization: `Bearer ${VIMEO_APP_TOKEN}`,
        },
      })
        .then(res => {
          // const qualitys = res.data.files.map(item => item.quality)
          // const hlsIndex = qualitys.findIndex(item => item === 'hls')
          // const index = hlsIndex !== -1 ? hlsIndex : 0

          resolve({
            uri: res.data.files[0].link,
            poster: res.data.pictures.sizes[3].link,
            naturalSize: {
              height: res.data.files[0].height,
              width: res.data.files[0].width,
            },
            status:
              res.data.upload.status === 'complete' && res.data.transcode.status === 'complete',
          })
        })
        .catch(error => reject(error))
    })
  }

  uploadPainVideoPart = ({
    videoPath,
    videoPathName,
    progressCallback,
    videoName,
    onSetUploadProgress,
    setLink,
  }) => {
    return new Promise((resolve, reject) => {
      const folder = '5216883'
      this.uploadVideoToVimeo({
        videoPath,
        videoPathName,
        progressCallback,
        folder,
        videoName,
        onSetUploadProgress,
        setLink,
      })
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
  }

  // uploadUserVideo = ({videoPath, progressCallback, videoName}) => {
  //   return new Promise((resolve, reject) => {
  //     const folder = '2697530'
  //     this.uploadVideoToVimeo({videoPath, progressCallback, folder, videoName})
  //       .then(res => resolve(res))
  //       .catch(error => reject(error))
  //   })
  // }

  // uploadFeedVideo = ({videoPath, progressCallback, videoName}) => {
  //   return new Promise((resolve, reject) => {
  //     const folder = '2914996'
  //     this.uploadVideoToVimeo({videoPath, progressCallback, folder, videoName})
  //       .then(res => resolve(res))
  //       .catch(error => reject(error))
  //   })
  // }

  getVideoStats = videoPath => {
    return new Promise((resolve, reject) => {
      RNFetchBlob.fs
        .stat(videoPath)
        .then(stats => resolve(stats))
        .catch(error => reject(error))
    })
  }

  saveStepO = ({ onSetUploadProgress, videoPathName, folder, videoName }) => {
    onSetUploadProgress &&
      onSetUploadProgress({
        videoPathName,
        folder,
        videoName,
      })
  }

  saveStep1 = ({ onSetUploadProgress, videoPathName, folder, videoName, uploadUrl, link }) => {
    onSetUploadProgress &&
      onSetUploadProgress({
        videoPathName,
        folder,
        videoName,
        uploadUrl,
        link,
      })
  }

  getUploadLinksFromRes = res => {
    return {
      uploadUrl: res?.data?.upload?.upload_link,
      link: res?.data?.link,
    }
  }

  uploadVideoToVimeo = ({
    videoPath,
    videoPathName,
    progressCallback,
    folder,
    videoName,
    onSetUploadProgress,
    setLink,
  }) => {
    return new Promise((resolve, reject) => {
      this.saveStepO({ onSetUploadProgress, videoPathName, folder, videoName })

      this.getVideoStats(videoPath)
        .then(stats => {
          progressCallback && progressCallback(1)
          return this.createVideo(stats.size, videoName)
        })
        .then(res => {
          const { uploadUrl, link } = this.getUploadLinksFromRes(res)
          this.saveStep1({ onSetUploadProgress, videoPathName, folder, videoName, uploadUrl, link })
          setLink && setLink(link)
          return { uploadUrl, link }
        })
        .then(({ uploadUrl, link }) =>
          this.uploadVideoFile({
            folder,
            uploadUrl,
            link,
            videoPath,
            progressCallback,
            uploadOffset: '0',
          }),
        )
        .then(link => {
          progressCallback && progressCallback(100)
          onSetUploadProgress && onSetUploadProgress()
          return link
        })
        .then(link => resolve(link))
        .catch(error => reject(error))
    })
  }

  createVideo = (size, name) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: `https://api.vimeo.com/me/videos`,
        headers: {
          Authorization: `Bearer ${VIMEO_APP_TOKEN}`,
          'Content-Type': 'application/json',
          Accept: 'application/vnd.vimeo.*+json;version=3.4',
        },
        data: {
          upload: {
            approach: 'tus',
            size,
          },
          name,
        },
      })
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
  }

  uploadVideoFile = ({ folder, uploadUrl, link, videoPath, progressCallback, uploadOffset }) => {
    return new Promise((resolve, reject) => {
      RNFetchBlob.fetch(
        'PATCH',
        uploadUrl,
        {
          'Tus-Resumable': '1.0.0',
          'Upload-Offset': uploadOffset,
          Accept: 'application/vnd.vimeo.*+json;version=3.4',
          'Content-Type': 'application/offset+octet-stream',
        },
        RNFetchBlob.wrap(videoPath),
      )
        .uploadProgress((written, total) => {
          const progress = Math.round((written * 95) / total)
          progress > 0 && progressCallback && progressCallback(progress)
        })
        .then(res => this.moveVideo(link, folder))
        .then(() => resolve(link))
        .catch(error => reject(error))
    })
  }

  moveVideo = (link, folder) => {
    return new Promise((resolve, reject) => {
      const id = this.getVideoId(link)
      axios({
        method: 'PUT',
        url: `https://api.vimeo.com/me/projects/${folder}/videos/${id}`,
        headers: {
          Authorization: `Bearer ${VIMEO_APP_TOKEN}`,
        },
      })
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
  }

  checkStatus = id => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `https://api.vimeo.com/videos/${id}?fields=uri,upload.status,transcode.status`,
        headers: {
          Authorization: `Bearer ${VIMEO_APP_TOKEN}`,
        },
      })
        .then(({ data }) =>
          resolve(data.upload.status === 'complete' && data.transcode.status === 'complete'),
        )
        .catch(error => reject(error))
    })
  }

  removeVideo = link => {
    return new Promise((resolve, reject) => {
      const id = this.getVideoId(link)
      axios({
        method: 'PUT',
        url: `https://api.vimeo.com/me/projects/2723238/videos/${id}`,
        headers: {
          Authorization: `Bearer ${VIMEO_APP_TOKEN}`,
        },
      })
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
  }

  continueUploading = async ({ data, progressCallback, onSetUploadProgress, setLink }) => {
    if (!data || !data?.videoPathName) {
      return
    }

    try {
      const isExist = await RNFetchBlob.fs.exists(data?.videoPathName)
      if (!isExist) {
        onSetUploadProgress && onSetUploadProgress()
        progressCallback && progressCallback()
        return
      }

      let isSet = false
      progressCallback && progressCallback(1)

      const videoPathName = data?.videoPathName
      const videoName = data?.videoName
      const folder = data?.folder
      let uploadUrl = data?.uploadUrl
      let link = data?.link

      if (!uploadUrl) {
        const stats = await this.getVideoStats(videoPathName)
        const res = await this.createVideo(stats.size, videoName)

        const uploadLinks = this.getUploadLinksFromRes(res)
        uploadUrl = uploadLinks?.uploadUrl
        link = uploadLinks?.link

        this.saveStep1({ onSetUploadProgress, videoPathName, folder, videoName, uploadUrl, link })

        setLink && setLink(link)
        isSet = true
      }

      if (uploadUrl) {
        const res = await api.getProgressUploadVideoStatus(uploadUrl)
        const data = res?.data
        const uploadLength = data?.['Upload-Length']?.[0]
        const uploadOffset = data?.['Upload-Offset']?.[0]

        if (uploadLength !== uploadOffset) {
          await this.uploadVideoFile({
            folder,
            uploadUrl,
            link,
            videoPath: videoPathName,
            progressCallback,
            uploadOffset,
          })

          onSetUploadProgress && onSetUploadProgress()
          progressCallback && progressCallback(100)

          if (!isSet) {
            setLink && setLink(link)
          }
        }
      }
    } catch (error) {
      handleError(error)
    }
  }
}

const vimeo = new Vimeo()
export default vimeo
