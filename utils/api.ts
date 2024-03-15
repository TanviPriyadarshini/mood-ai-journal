const createUrl = (path) => {
    return window.location.origin + path
}

export const updateEntry = async (id, content) => {
    const res = await fetch(new Request(createUrl(`/api/journal/${id}`), {
        method: "PATCH",
        body: JSON.stringify({ content })
    }))
    if (res.ok) {
        const data = await res.json()
        return data.data
    }
}

export const createNewEntry = async () => {
    const res = await fetch(new Request(createUrl('/api/journal'), {
        method: "POST",
    }))
    if (res.ok) {
        console.log("reached in ok block")
        const data = await res.json()
        console.log("🚀 ~ createNewEntry ~ data:", data)
        return data.data
    }
}

export const askQuestion = async (question) => {
    console.log("reached here")
    const res = await fetch(new Request(createUrl('/api/question'), {
        method: "POST",
        body: JSON.stringify({ question })
    }))
    console.log("reached after res", res)
    if (res.ok) {
        const data = await res.json()
        console.log("🚀 ~ askQuestion ~ data:", data)
        return data.data
    }
}