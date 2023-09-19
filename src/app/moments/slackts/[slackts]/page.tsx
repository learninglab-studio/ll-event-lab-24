const Airtable = require('airtable')
const airtableTools = require('@/lib/utils/airtable-tools')

async function getData(recordId) {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_MOMENT_BASE);
    try {
      const records = await base('Moments').find(recordId);
      console.log(JSON.stringify(records, null, 4))
      return records;
    } catch (error) {
      throw new Error('Failed to fetch data from Airtable');
    }
}

async function getRecordFromSlackTs(slackts) {
    console.log(`looking for ${slackts} in Airtable`)   
    try {
        let result = await airtableTools.findOneByValue({
            baseId: process.env.AIRTABLE_MOMENT_BASE,   
            table: "Moments",
            view: "MAIN",   
            field: "OriginalItemSlackTs",
            value: slackts
        });
        console.log(JSON.stringify(result, null, 4));
        return result;
    } catch (error) {
        console.error(error)
    }
}

// async function getRecord(recordId) {
//     const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_MOMENT_BASE);
//     try {
//         base('Moments').find('reczlgVywhYVrS3dD', function(err, record) {
//             if (err) { console.error(err); return; }
//             console.log('Retrieved', record.id);
//         });
//     //   console.log(JSON.stringify(record, null, 4))
//     //   return record;
//     } catch (error) {
//       throw new Error('Failed to fetch data from Airtable');
//     }

    


// }

export default async function Page({ params }: { params: { slackts: string } }) {
    console.log(`looking for ${params.slackts} in Airtable`)
    // let recordData = await getRecordFromSlackTs(params.slackts)

    return (<div>
        <h1>My Post: {params.slackts}</h1>
        {/* <pre>{JSON.stringify(recordData, null, 4)}</pre> */}
    </div>)
}

// export async function generateStaticParams() {
//     const posts = await fetch('https://.../posts').then((res) => res.json())
   
//     return posts.map((post) => ({
//       slug: post.slug,
//     }))
//   }