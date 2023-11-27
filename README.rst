
.. figure:: https://user-images.githubusercontent.com/14353512/185425447-85dbcde9-f3a2-4f06-a2db-0dee43af2f5f.png
    :align: left
    :target: https://github.com/rl-institut/super-repo/
    :alt: Repo logo

============
Oekg-Builder
============

**A template repo to test and document elements and features for research software.**

.. list-table::
   :widths: auto

   * - License
     - |badge_license|
   * - Documentation
     - |badge_documentation|
   * - Publication
     -
   * - Development
     - |badge_issue_open| |badge_issue_closes| |badge_pr_open| |badge_pr_closes|
   * - Community
     - |badge_contributing| |badge_contributors| |badge_repo_counts|

.. contents::
    :depth: 2
    :local:
    :backlinks: top

.. warning::

   **Disclaimer:** This tool is a work in progress. Some features are not fully implemented yet.

The oekg-builder provides a simple way for Open Energy Platform (OEP) users to create RDF-based factsheets through a user interface. Here are some `screenshots <https://github.com/OpenEnergyPlatform/oekg-builder/issues/4>`_ from the current version of the tool.

Installation
============

1. Install npm:

   - On Linux:

     .. code-block:: shell

        sudo apt install npm

   - On MacOS:

     .. code-block:: shell

        brew install node

   - On Windows, see `here <https://docs.npmjs.com/downloading-and-installing-node-js-and-npm>`_.

2. Clone the repository and run the following commands:

   .. code-block:: shell

      cd oekg-builder
      npm install
      npm start

After running the above commands, the tool should automatically open in your browser.

.. note::

   **Note:** You may need to upgrade your NodeJS and npm installations. It is recommended to have NodeJS >= 14.0.0 and NPM >= 5.6.

   - For Node.JS upgrades, see `here <https://phoenixnap.com/kb/update-node-js-version>`_.
   - For NPM upgrades, see `here <https://docs.npmjs.com/try-the-latest-stable-version-of-npm>`_.


.. |badge_license| image:: https://img.shields.io/github/license/OpenEnergyPlatform/oekg-builder
    :target: LICENSE.txt
    :alt: License

.. |badge_documentation| image::
    :target:
    :alt: Documentation

.. |badge_contributing| image:: https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat
    :alt: contributions

.. |badge_repo_counts| image:: http://hits.dwyl.com/OpenEnergyPlatform/oekg-builder.svg
    :alt: counter

.. |badge_contributors| image:: https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square
    :alt: contributors

.. |badge_issue_open| image:: https://img.shields.io/github/issues-raw/OpenEnergyPlatform/oekg-builder
    :alt: open issues

.. |badge_issue_closes| image:: https://img.shields.io/github/issues-closed-raw/OpenEnergyPlatform/oekg-builder
    :alt: closes issues

.. |badge_pr_open| image:: https://img.shields.io/github/issues-pr-raw/OpenEnergyPlatform/oekg-builder
    :alt: closes issues

.. |badge_pr_closes| image:: https://img.shields.io/github/issues-pr-closed-raw/OpenEnergyPlatform/oekg-builder
    :alt: closes issues
