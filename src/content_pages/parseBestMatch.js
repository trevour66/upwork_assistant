const processJobList = () => {
  // data-ev-sublocation="job_feed_tile"
  const jobSections =
    document.querySelectorAll('section[data-ev-sublocation="job_feed_tile"]') ?? false

  if (!jobSections) {
    return
  }

  for (let index = 0; index < jobSections.length; index++) {
    const element = jobSections[index]

    let postedOnEl = element.querySelector('span[data-test="posted-on"]') ?? false
    let proposalsCountEl = element.querySelector('strong[data-test="proposals"]') ?? false

    if (!postedOnEl || !proposalsCountEl) {
      continue
    }

    let postedOnEl_text = postedOnEl.innerHTML
    let proposalsCountEl_text = proposalsCountEl.innerHTML

    if (postedOnEl_text.includes('minute')) {
      element.style.backgroundColor = '#00A36C'
    }
    if (postedOnEl_text.includes('hour')) {
      element.style.backgroundColor = '#ECFFDC'
    }
  }
}

function checkLoading(mutationsList, observer) {
  const loaderElements = document.querySelectorAll('.job-tile-placeholder') ?? []

  if (loaderElements.length === 0) {
    processJobList()
    observer.disconnect() // Stop observing once loading is complete
  }
}

const observer = new MutationObserver(checkLoading)

observer.observe(document.body, { childList: true, subtree: true })
