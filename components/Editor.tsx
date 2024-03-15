'use client'

import { updateEntry } from "@/utils/api"
import { useState } from "react"
import { useAutosave } from 'react-autosave'

const Editor = ({ entry }) => {
    const [value, setValue] = useState(entry.content)
    const [isLoading, setIsLoading] = useState(false)
    const [analysis, setAnalysis] = useState(entry.analysis)
    const { mood, subject, color, summary, negative } = analysis
    const analysisData = [
        { name: 'Summary ', value: summary },
        { name: 'Subject', value: subject },
        { name: 'Mood', value: mood },
        { name: 'Negative', value: negative ? 'True' : 'False' }
    ]
    useAutosave({
        data: value,
        onSave: async (_value) => {
            setIsLoading(true)
            const data = await updateEntry(entry.id, _value)
            setAnalysis(data.analysis)
            setIsLoading(false)
        }
    })
    return (
        <div className="w-full h-full grid grid-cols-3">
            <div className="col-span-2">
                {isLoading && <div>... loading</div>}
                <textarea className="w-full h-full  p-8 text-xl outline-none" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
            <div className="border-l border-blacl/10">
                <div className="px-4 py-10" style={{ backgroundColor: color }}>
                    <h2 className="text-2xl">Analysis</h2>
                </div>
                <div>
                    <ul>
                        {analysisData.map((item, i) => (
                            <li key={i} className="flex item-center justify-between  px-2 py-4 border-b border-t border-black/10">
                                <span className="text-lg font-semibold">{item.name}</span>
                                <span>{item.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Editor