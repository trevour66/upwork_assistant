const interact_with_job = async (job_body_inner_text, job_heading_inner_text, job_id) => {
  const interact_with_job_res = await new Promise(async (resolve, reject) => {
    try {
      chrome.runtime.sendMessage(
        {
          action: 'JOB_DESCRIPTION_PARSED',
          asset: {
            job_id: job_id,
            job_url: `https://www.upwork.com/jobs/~${job_id}`,
            job_heading: job_heading_inner_text,
            job_description: job_body_inner_text
          }
        },
        (response) => {
          console.log(response)
          resolve(response)
        }
      )
    } catch (error) {
      reject(error.message)
    }
  })

  return interact_with_job_res
}

function getJobId(urlString) {
  try {
    // const urlString = "https://www.upwork.com/jobs/~021906731691259341192?referrer_url_path=%2Fbest-matches%2Fdetails%2F~021906731691259341192";
    const url = new URL(urlString)
    const pathname = url.pathname

    const jobId = pathname.match(/~(\d+)/)?.[1]

    console.log(jobId) // Output: "021906731691259341192"

    if (typeof jobId === 'undefined') {
      new Error('job ID undefined')
    }

    return jobId
  } catch (error) {
    console.log(error.message)
    return false
  }
}

async function checkLoading(mutationsList, observer) {
  console.log('job')

  const job_bodies = document.querySelectorAll('p[class="text-body-sm"]') ?? false
  const job_headings = document.querySelectorAll('h4') ?? false

  const urlString = window.location.href

  const jobId = getJobId(urlString)

  if (!job_bodies) {
    console.log('job_bodies not available')
    return
  }

  if (!jobId) {
    console.log('jobId not available')
    return
  }

  const job_body = job_bodies[0] ?? null
  const job_heading = job_headings ? job_headings[0] ?? null : null

  if (!job_body) {
    console.log('job_body not available')
    return
  }

  const job_body_inner_text = job_body.innerText ?? null
  const job_heading_inner_text = job_heading.innerText ?? null

  console.log(job_body_inner_text)

  const res = await interact_with_job(job_body_inner_text, job_heading_inner_text, jobId)

  console.log('res')
  console.log(res)
  observer.disconnect() // Stop observing once loading is complete
}

const observer = new MutationObserver(checkLoading)

observer.observe(document.body, { childList: true, subtree: true })
