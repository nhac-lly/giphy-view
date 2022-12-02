// zonejs is insane
// not used

export function createService(url: string, params: unknown) {
    const urlParams = new URLSearchParams(params as string).toString()
    const controller = new AbortController
    const { signal } = controller
    let status = 'fetching'
    let result: unknown[] = []
    const suspender = fetch(url + '?' + urlParams, { signal })
    .then(res => res.json())
    .then(
        (res) => {
            result.push(res)
            status = 'success'
        },
    )
    .catch(
        (err) => {
            result.push(err)
            status = 'error'
        }
    )
    return {
        get() {
            if (status === 'error') {
                throw result
            } else if (status === 'success') {
                return result[result.length -1]
            } else {
                throw suspender
            }
        },
        clear() {
            result = []
        },
        cancel() {
            controller.abort()
        }
    }
}