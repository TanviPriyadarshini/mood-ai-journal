import HistoryCharts from "@/components/HistoryCharts"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getData = async () => {
    const user = await getUserByClerkId()
    const analyses = await prisma.analysis.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: 'asc'
        }
    })

    const sum = analyses.reduce((acc, current) => acc + current.sentimentScore, 0)
    const avg = Math.round(sum / analyses.length)
    return { analyses, avg }
}

const History = async () => {
    const { analyses, avg } = await getData()
    return (
        <div className="h-full w-full">
            <div>
                {`Avg. Sentiment : ${avg}`}
            </div>
            <div className="h-full w-full">
                <HistoryCharts data={analyses} />
            </div>
        </div>
    )
}
export default History