// import { send_request } from '../claude/send_request'

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  try {
    console.log('message')
    console.log(message)
    if (message.action === 'JOB_DESCRIPTION_PARSED') {
      ;(async () => {
        const job_id = message?.asset?.job_id ?? null
        const job_url = message?.asset?.job_url ?? null
        const job_heading = message?.asset?.job_heading ?? null
        const job_description = message?.asset?.job_description ?? null

        console.log('job_description')
        // console.log(job_description)

        // send_request(job_description)

        await chrome.storage.local.set({
          most_recent_job: {
            job_id: job_id,
            job_url: job_url,
            job_heading: job_heading,
            job_description: job_description
          }
        })

        sendResponse({ response: 'received' })
      })()
    }

    sendResponse({ response: 'received' })

    return true
  } catch (error) {
    console.log(error.message)
    sendResponse({ response: 'received', error: true })
    return true
  }
})
