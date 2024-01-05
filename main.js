const { Client, GatewayIntentBits, Partials, PermissionsBitField, ClientUser } = require('discord.js');
const client = new Client({ 
  intents: [GatewayIntentBits.GuildVoiceStates,GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent]
  ,restTimeOffset: 50
  ,partials: [Partials.Channel] });
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const { ActionRowBuilder, MessageActionRow, ButtonBuilder, ButtonStyle, InteractionType, ActivityType } = require('discord.js');

const Kuroshiro = require("kuroshiro");
const KuromojiAnalyzer = require("kuroshiro-analyzer-kuromoji");

async function convertToHiragana(text) {
    const kuroshiro = new Kuroshiro();
    
    await kuroshiro.init(new KuromojiAnalyzer());
    const result = await kuroshiro.convert(text, { to: "hiragana" });

    const kana_to_hiragana = await Kuroshiro.Util.kanaToHiragna(result);

    const replaced_bhmt = await kana_to_hiragana.replace(/[、。！？]/g,"");
    
    console.log(result);
    console.log(kana_to_hiragana);
    console.log(replaced_bhmt)
    console.log("= = = = = = = = = = = = = = = = = = = = = = =")

    return replaced_bhmt;
}

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

const ver = "0.1.0";

client.on('ready', () => {
  console.log(`+ = = = = = = = = = = = = = = = = = = +`)
  console.log(`${client.user.tag} is online!`)
  console.log(`${client.user.tag} Version.${ver}`)
  console.log(`Discord.js@v14`)
  console.log(`+ = = = = = = = = = = = = = = = = = = +`);
  client.user.setPresence({ activities: [{ name: `Powered by ossmxun.net`, type: ActivityType.Playing }],
  status: 'online'});
});

let status_status = 0;
client.on('ready', () => {
  setInterval( async () => {
    if(status_status === 0) {
      client.user.setPresence({ activities: [{ name:"あ", state: "...破廉恥！", type: ActivityType.Custom}],
      status: 'online'});

      status_status = 1;
    } else if(status_status === 1) {
      client.user.setPresence({ activities: [{ name: `Powered by ossmxun.net`, type: ActivityType.Playing }],
      status: 'online'});
  
      status_status = 0;
    }
  }, 10 * 1000)
  // 1000をかけて秒に変換
});

const krs = "♂";

client.on("messageCreate", async message => {
  if(message.author.bot || !message.guild || message.webhookId || message.system) return;

  const cv_to_h = await convertToHiragana(message.content);

  const temp_ngword = [
    "69",
    "しっくすないん",
    "3p",
    "3P",
    "さんぴー",
    "あくめ",
    "あなきょうだい",
    "あなる",
    "あぬす",
    "あさだち",
    "ばっく",
    "ぼいん",
    "ぼっき",
    "ぶっかけ",
    "ちぶさ",
    "ちくび",
    "ちんちん",
    "ちんげ",
    "ちんかす",
    "ちんこ",
    "ちんぽ",
    "ちつ",
    "くり",
    "くりとりす",
    "こんどーむ",
    "かうぱー",
    "くんに",
    "くんにりんぐす",
    "だいべん",
    "でかちん",
    "でかまら",
    "どうてい",
    "ふぇら",
    "がんしゃ",
    "えっち",
    "ひんにゅう",
    "いちもつ",
    "いくいく",
    "いんぽ",
    "いんらん",
    "じいこうい",
    "じょせいき",
    "かいめんたい",
    "かんちょう",
    "かり",
    "きじょうい",
    "きんたま",
    "きとう",
    "こうがん",
    "こうはいい",
    "こうもん",
    "きょこん",
    "きょにゅう",
    "らぶほ",
    "まんげ",
    "まんじる",
    "まんこ",
    "まら",
    "むせい",
    "なかだし",
    "ねとられ",
    "のーぱん",
    "ぬーど",
    "おちんちん",
    "おちんこ",
    "おめこ",
    "おなにー",
    "0721",
    "おなる",
    "おっぱい",
    "おしり",
    "ぱいおつ",
    "ぱいぱん",
    "ぱいずり",
    "ぱんちら",
    "ぱんつ",
    "ぱんてぃー",
    "ぺにす",
    "ぽこちん",
    "ざーめん",
    "さおしまい",
    "すかとろ",
    "せいえき",
    "せいこう",
    "せいし",
    "せっくす",
    "しこしこ",
    "4545",
    "しおふき",
    "そーぷらんど",
    "そちん",
    "そうにゅう",
    "すぺるま",
    "すまた",
    "しゃせい",
    "たまきん",
    "たまたま",
    "てこき",
    "てまん",
    "うんち",
    "うんこ",
    "ばいぶ",
    "やりちん",
    "やりまん",
    "ぜっちょう"
  ]

  let connect_message = null;
  for (let i = 0; i <= 2;i) {
    const index = temp_ngword.findIndex(c => cv_to_h.includes(c));
    console.log(index)

    if(index === -1) {
      i = 4;
    } else {
      const delete_ingo = temp_ngword.splice(index, 1);
      if(connect_message === null) {
        connect_message = delete_ingo;
      } else {
        connect_message = connect_message + "、" + delete_ingo;
      }
    }
  }

  if(connect_message !== null) {
    await message.reply({ embeds: [{
      footer: {
        icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),
        text: "Create by : oSsmXun256"
      },
      title: krs+"NGワードを検知しました。",
      description: "NGワード: "+connect_message,
      color: 0x00CED1,
      timestamp: new Date()
    }]});

  }
});

client.login('');
