// import { determineNextGroup } from "./determineNextGroup";
import { Tree, TreeNode } from "../../../../core/tree";
import { determineNextGroup } from "./determineNextGroup";
import { getRankedTRX } from "./getRankedTRX";

export const buildTreeFromRankedTracks = async (req: any, res: any) => {
  const userPreferences = getRandomElements(trx, 8);

  const rankedTracks: any = await getRankedTRX({ userPreferences });

  const n = 3;

  let radioTree = new Tree();
  let radioSliceIndex = 0;

  while (radioSliceIndex < rankedTracks.length) {
    let radioSlice = rankedTracks
      .map((item: any) => item.isrc)
      .slice(radioSliceIndex, radioSliceIndex + n);
    let radioSliceNode = new TreeNode(radioSlice);

    // Assuming that determineNextGroup is a function that determines the next group of tracks
    // based on user interactions with the current group

    const isNextRadioSliceValid = radioSliceIndex + n < rankedTracks.length;

    if (isNextRadioSliceValid) {
      radioSliceNode.default = new TreeNode(
        rankedTracks
          .map((item: any) => item.isrc)
          .slice(radioSliceIndex + n, radioSliceIndex + n * 2)
      );
      radioSliceNode.like = new TreeNode(
        await Promise.resolve(
          determineNextGroup({
            responseType: "like",
            radioSliceIndex,
            rankedTracks,
            n,
          })
        )
      );
      radioSliceNode.dislike = new TreeNode(
        await Promise.resolve(
          determineNextGroup({
            responseType: "dislike",
            radioSliceIndex,
            rankedTracks,
            n,
          })
        )
      );
    }

    radioTree.addNode(radioSliceNode);
    radioSliceIndex += n;
  }

  return res.json(radioTree);
};

function getRandomElements(arr: any[], n: number) {
  let result = new Array(n);
  let len = arr.length;
  let taken = new Array(len);

  if (n > len)
    throw new RangeError(
      "getRandomElements: more elements taken than available"
    );

  while (n--) {
    let x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

const trx = [
  "trx:00:GBBBM0002021",

  "trx:00:QM42K1968187",

  "trx:00:QZFYX2070668",

  "trx:00:QZK6G2016844",

  "trx:00:QZK6H2245650",

  "trx:00:QZTB92250140",

  "trx:00:TCACR1670728",

  "trx:00:US2S70465018",

  "trx:00:USAT20104397",

  "trx:00:USCM51400385",

  "trx:00:USLD91742711",

  "trx:00:USQX91901111",

  "trx:00:USRC11901551",

  "trx:00:USTV10400108",

  "trx:00:USUG12106602",

  "trx:00:USUM71203564",

  "trx:00:USUM71207186",

  "trx:00:USUM71517405",

  "trx:00:USUM72106475",

  "trx:00:USUM72203823",

  "trx:00:USUM72212300",

  "trx:00:USUYG1445239",

  "trx:00:ZAUM72101068",

  "trx:00:AUHS01205284",

  "trx:00:GBAHT2101024",

  "trx:00:GBAYE0501496",

  "trx:00:GBN9Y1100079",

  "trx:00:QMCE31902193",

  "trx:00:QZ5FA1752282",

  "trx:00:QZGLS2205516",

  "trx:00:TCACJ1532154",

  "trx:00:TCADX1878889",

  "trx:00:UK43Q1705413",

  "trx:00:USANG2223546",

  "trx:00:USAT21811322",

  "trx:00:USAT22005333",

  "trx:00:USCM51800004",

  "trx:00:USJI10300705",

  "trx:00:USLD91740131",

  "trx:00:USLD91742721",

  "trx:00:USRC11502201",

  "trx:00:USTB10501740",

  "trx:00:USUM71202995",

  "trx:00:USUM71603293",

  "trx:00:USUM71603531",

  "trx:00:USUM71705478",

  "trx:00:USUM72215780",

  "trx:00:USUYG1314904",

  "trx:00:FR9W11415795",

  "trx:00:FRX202363539",

  "trx:00:GBARL2001236",

  "trx:00:GBBKS1900016",

  "trx:00:GBLFP1621295",

  "trx:00:QM24S1703585",

  "trx:00:QM42K1977009",

  "trx:00:QMDA62233397",

  "trx:00:QMJMT1701216",

  "trx:00:QZAKB2154045",

  "trx:00:QZFYY2312488",

  "trx:00:QZJRB2273278",

  "trx:00:QZTB22256577",

  "trx:00:TCADA1780538",

  "trx:00:TCAEK1955076",

  "trx:00:USANG2208486",

  "trx:00:USAT20104373",

  "trx:00:USAT21600354",

  "trx:00:USCM51400222",

  "trx:00:USCM51800006",

  "trx:00:USG7D1483908",

  "trx:00:USJI10200366",

  "trx:00:USLD91733680",

  "trx:00:USLD91740130",

  "trx:00:USLD91740138",

  "trx:00:USQX92200945",

  "trx:00:USUM72024701",

  "trx:00:USUM72118232",

  "trx:00:USUM72215880",

  "trx:00:USUYG1001590",

  "trx:00:USUYG1445231",

  "trx:00:USWB11801215",

  "trx:00:GBUM72100128",

  "trx:00:GBUM72101036",

  "trx:00:QM24S2206104",

  "trx:00:QM6MZ1815397",

  "trx:00:QZAKB2008384",

  "trx:00:QZHNC2109334",

  "trx:00:QZJRB2273290",

  "trx:00:QZTAY2261485",

  "trx:00:SE6HN2194013",

  "trx:00:USAT21301167",

  "trx:00:USAT21500313",

  "trx:00:USAT22108192",

  "trx:00:USLD91741070",

  "trx:00:USRC11401841",

  "trx:00:USSM11301900",

  "trx:00:USSM12005344",

  "trx:00:USSM19912799",

  "trx:00:USUG11802484",

  "trx:00:USUM70846400",

  "trx:00:USUM71320211",

  "trx:00:USUM71910266",

  "trx:00:USWB11401859",

  "trx:00:FRZ189800042",

  "trx:00:GBARL1100329",

  "trx:00:QM4TW2272531",

  "trx:00:QZFYZ2046321",

  "trx:00:QZFZ61900487",

  "trx:00:QZK6H2245640",

  "trx:00:QZRP52369903",

  "trx:00:QZTB32264046",

  "trx:00:TCAGE2289065",

  "trx:00:US06B7800323",

  "trx:00:USAT21000477",

  "trx:00:USAT21704846",

  "trx:00:USAT22221194",

  "trx:00:USHR11536744",

  "trx:00:USLD90812957",

  "trx:00:USLD91740134",

  "trx:00:USLD91740144",

  "trx:00:USQX91402597",

  "trx:00:USSM10411607",

  "trx:00:USSM11607555",

  "trx:00:USSM11801917",

  "trx:00:USSM12107673",

  "trx:00:USUG11600976",

  "trx:00:USUG11601011",

  "trx:00:USUG12204888",

  "trx:00:USUM70609120",

  "trx:00:USUM71207190",

  "trx:00:USUM71417486",

  "trx:00:USUM71714139",

  "trx:00:USUYG1001593",

  "trx:00:CA5KR2137072",

  "trx:00:GB2DY1900476",

  "trx:00:GBARL1100324",

  "trx:00:GBW371300120",

  "trx:00:QM24S2206248",

  "trx:00:QM4TW2285318",

  "trx:00:QZ22B1610060",

  "trx:00:QZHNA2168126",

  "trx:00:QZHNC2109337",

  "trx:00:QZK6H2158171",

  "trx:00:QZMEM2163366",

  "trx:00:QZMHN2352582",

  "trx:00:QZTAZ2213824",

  "trx:00:TCACJ1548120",

  "trx:00:USAEA8168353",

  "trx:00:USANG2242573",

  "trx:00:USAT21602944",

  "trx:00:USCM51300758",

  "trx:00:USGF19942501",

  "trx:00:USLD91740126",

  "trx:00:USRC11200647",

  "trx:00:USRH10300817",

  "trx:00:USTC70837111",

  "trx:00:USUM71400720",

  "trx:00:USUM72204811",

  "trx:00:USWB11302160",

  "trx:00:USWB11508712",

  "trx:00:USWB11600360",
];
