{-# LANGUAGE OverloadedStrings #-}

import Prelude
import qualified Prelude as P
import Data.Monoid (mempty)

import Text.Blaze.Html5
import qualified Text.Blaze.Html5 as H
import Text.Blaze.Html5.Attributes hiding (challenge)
import qualified Text.Blaze.Html5.Attributes as A

import Text.Blaze.Html.Renderer.Pretty (renderHtml)

elem !. c = elem ! class_ c
elem !# i = elem ! A.id i

boilerplate navlist content scripts =
  let scripts' = mapM_ (\s -> script ! src s $ mempty) $ [
                    "js/vendor/jquery-1.10.2.min.js"
                    , "js/vendor/bootstrap.min.js" ] ++ scripts
  in do
    docTypeHtml ! lang "en" $ do
        H.head $ do
            meta ! charset "utf-8"
            H.title "BaroboLab - DEMO"
            link ! rel "stylesheet" ! href "css/bootstrap.min.css"
            link ! rel "stylesheet" ! href "css/main.css"
        body $ do
            nav ! class_ "app" $ do
                a ! href "index.html" $ img ! src "img/barobo_logo.png"
                ol ! class_ "nav nav-stacked nav-pills" $ sequence_ navlist
            section $ content
            scripts'

boilerplate' n c = boilerplate n c []

genHtml (file, html) = writeFile file $ renderHtml html

-- | Coerce that squirrely string literal
str :: String -> Html
str = toHtml

val :: String -> AttributeValue
val = toValue

labNavHdr =
    [ li $ a ! href "holt.html" $ img ! src "img/holt_california.png"
    , li $ a ! href "chap6.html" $ "Chapter 6"
    , hr ! class_ "hdr"
    ]

labNavFtr =
    [ hr ! class_ "ftr"
    , li $ a ! href "lab_overview.html" $ small ! class_ "text-muted" $ "Overview"
    ]

labNav, labNavInner :: String -> [Html]

labNavInner title =
    [ li $ a ! href "setup.html" $ H.div $ do
        "6.1:"
        small "Cops vs. Robbers"
    , li ! class_ "active" $ a ! href "#" $ toHtml title
    ]

labNav title =
    labNavHdr ++
    (labNavInner title) ++
    labNavFtr

challenge = boilerplate
    (labNav "Challenge")
    (do
      h2 $ "Factoring Challenge"
      H.div ! A.id "challengeApp" $ mempty
    )
    ["js/vendor/serenade.0.5.0.js"
    ,"js/challenge/sr-view-app.js"
    ,"js/vendor/linkbot.js"
    ,"js/challenge.js"
    ]

main = mapM_ genHtml [
    ("html/challenge.html", challenge)
    ]
